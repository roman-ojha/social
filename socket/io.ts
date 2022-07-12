import { createServer } from "http";
import express, { Express } from "express";
import { Server } from "socket.io";
import userDetail from "../models/userDetail_model.js";
import cookie from "cookie";
import socketCookieParse from "socket.io-cookie-parser";
import ioAuthenticate from "./authUser.js";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { credentials: true, origin: process.env.CLIENT_BASE_URL },
  cookie: true,
});

io.use(socketCookieParse());

io.use(async (socket, next) => {
  try {
    if (socket.handshake.headers.cookie) {
      const cookies = cookie.parse(socket.handshake.headers.cookie);
      const resAuth = await ioAuthenticate(cookies.AuthToken);
      if (!resAuth.success) {
        next(new Error(resAuth.msg));
      }
      next();
    } else {
      next(new Error("Token not provided"));
    }
  } catch (err) {
    next(new Error("Server Error while connecting to socket"));
  }
});

io.on("connect", (socket) => {
  socket.on("send-message", async (messageInfo, cb) => {
    try {
      // NOTE : I have to authenticate before saving the message
      // const emittingMessageInfo = {
      //   senderId: messageInfo.senderId,
      //   senderUserId: messageInfo.senderUserId,
      //   content: messageInfo.message,
      //   date: Date(),
      // };
      //   const senderId = messageInfo.senderId;
      //   const receiverId = messageInfo.receiverId;
      //   // if message already created then we just have to save
      //   const resSaveReceiverMsg = await userDetail.updateOne(
      //     // creating and saving message to sender
      //     {
      //       id: receiverId,
      //     },
      //     {
      //       $push: {
      //         "messages.$[field].message": {
      //           // pushing message inside the message array which match the condition of "messageBy"==='sender'
      //           senderId: senderId,
      //           content: messageInfo.message,
      //           date: new Date(),
      //         },
      //       },
      //     },
      //     {
      //       arrayFilters: [{ "field.messageToId": senderId }],
      //       // here we are filtering the messageBy
      //     }
      //   );
      //   if (!resSaveReceiverMsg.matchedCount) {
      //     // this will run if update doesn't happen in database it might be because of user doesn't exist
      //     // NOTE: i am doing this process to reduce the query for database so that the number of query became small and will be fast
      //     cb({
      //       success: false,
      //       msg: "User doesn't exist or Message doesn't created",
      //     });
      //   }
      //   // if reciver exist and will update the message there then we can update the message for sender as well
      //   const resSaveSenderMsg = await userDetail.updateOne(
      //     // creating and saving message to sender
      //     {
      //       id: senderId,
      //     },
      //     {
      //       $push: {
      //         "messages.$[field].message": {
      //           // pushing message inside the message array which match the condition of "messageBy"==='sender'
      //           senderId: senderId,
      //           content: messageInfo.message,
      //           date: new Date(),
      //         },
      //       },
      //       $set: {
      //         "messages.$[field].lastMessageOn": new Date(),
      //       },
      //     },
      //     {
      //       arrayFilters: [{ "field.messageToId": receiverId }],
      //       // here we are filtering the messageBy
      //     }
      //   );
      //   if (!resSaveSenderMsg.matchedCount) {
      //     cb({
      //       success: false,
      //       msg: "User doesn't exist or Message doesn't created",
      //     });
      //   }
      //   // after saving to data base we will send msg through socket
      //   socket.to(messageInfo.receiverId).emit("send-message-client", {
      //     success: true,
      //     msgInfo: emittingMessageInfo,
      //     senderPicture: messageInfo.senderPicture,
      //   });
      //   cb({
      //     success: true,
      //     msgInfo: emittingMessageInfo,
      //   });
      console.log("hello");
      cb({
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    } catch (err) {
      cb({
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  });
  socket.on("join-room", (roomID, cb) => {
    socket.join(roomID);
    cb(`joined on ${roomID}`);
  });
});

export default io;
export { httpServer, app };
