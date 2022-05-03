import { createServer } from "http";
import express, { Express } from "express";
import { Server } from "socket.io";
import userDetail from "../models/userDetail_model.js";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { credentials: true, origin: process.env.CLIENT_BASE_URL },
});

io.on("connect", (socket) => {
  socket.on("send-message", async (messageInfo, cb) => {
    // NOTE : I have to authenticate before saving the message
    const emittingMessageInfo = {
      sender: messageInfo.sender,
      content: messageInfo.message,
      date: Date(),
    };
    try {
      const sender = messageInfo.sender;
      const receiver = messageInfo.receiver;
      // if message already created then we just have to save
      const resSaveReciverMsg = await userDetail.updateOne(
        // creating and saving message to sender
        {
          userID: receiver,
        },
        {
          $push: {
            "messages.$[field].message": {
              // pushing message inside the message array which match the condition of "messageBy"==='sender'
              sender: sender,
              content: messageInfo.message,
              date: Date(),
            },
          },
        },
        {
          arrayFilters: [{ "field.messageTo": messageInfo.sender }],
          // here we are filtering the messageBy
        }
      );
      if (!resSaveReciverMsg.matchedCount) {
        // this will run if update doesn't happen in database it might be because of user doesn't exist
        // NOTE: i am doing this process to reduce the query for database so that the number of query became small and will be fast
        cb({
          success: false,
          msg: "User doesn't exist or Message doesn't created",
        });
      }
      // if reciver exist and will update the message there then we can update the message for sender as well
      const resSaveSenderMsg = await userDetail.updateOne(
        // creating and saving message to sender
        {
          userID: sender,
        },
        {
          $push: {
            "messages.$[field].message": {
              // pushing message inside the message array which match the condition of "messageBy"==='sender'
              sender: sender,
              content: messageInfo.message,
              date: Date(),
            },
          },
        },
        {
          arrayFilters: [{ "field.messageTo": receiver }],
          // here we are filtering the messageBy
        }
      );
      // after saving to data base we will send msg through socket
      socket.to(messageInfo.roomID).emit("send-message-client", {
        success: true,
        msgInfo: emittingMessageInfo,
      });
      cb({ success: true, msgInfo: emittingMessageInfo });
    } catch (err) {}
  });
  socket.on("join-room", (roomID, cb) => {
    socket.join(roomID);
    cb(`joined on ${roomID}`);
  });
});

export default io;
export { httpServer, app };
