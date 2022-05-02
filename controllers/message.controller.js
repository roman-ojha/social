import userDetail from "../models/userDetail_model.js";
import crypto from "crypto";

export default {
  createMessage: async (req, res) => {
    try {
      const rootUser = req.rootUser;
      const receiverUser = req.body.receiver;
      if (!req.body.receiver) {
        return res.status(401).json({ error: "receiver Doesn't exist" });
      }
      const receiverExist = await userDetail.findOne({
        // searching that user to message if it exist
        userID: receiverUser,
      });
      if (!receiverExist) {
        return res.status(400).json({ error: "User doesn't exist" });
      }
      const messageExist = await userDetail.findOne({
        userID: rootUser.userID,
        messages: {
          $elemMatch: {
            messageTo: receiverUser,
          },
        },
      });
      if (!messageExist) {
        // if initialize message doesn't exist then we have to create a field for both user
        const resSaveRootMsg = await userDetail.updateOne(
          // creating and saving message to rootUser
          {
            userID: rootUser.userID,
          },
          {
            $push: {
              messages: {
                messageTo: receiverUser,
                receiverPicture: receiverExist.picture,
                message: [],
              },
            },
          }
        );
        const resSaverReciverMsg = await userDetail.updateOne(
          // creating and saving message to rootUser
          {
            userID: receiverUser,
          },
          {
            $push: {
              messages: {
                messageTo: rootUser.userID,
                receiverPicture: rootUser.picture,
                message: [],
              },
            },
          }
        );
        if (resSaverReciverMsg && resSaveRootMsg) {
          return res.status(200).json({ message: "message created" });
        } else {
          return res.status(500).json({ error: "server error" });
        }
      } else {
        return res
          .status(200)
          .json({ message: "Message already been created" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Server Error!!, Please Try again letter" });
    }
  },
  getMessage: async (req, res) => {
    try {
      const rootUser = req.rootUser;
      const receiverUserID = req.body.userID;
      if (!receiverUserID) {
        return res
          .status(404)
          .json({ success: false, err: "Receiver user doesn't exist" });
      }
      const receiverExist = await userDetail.findOne({
        // searching that user to message if it exist
        userID: receiverUserID,
      });
      if (!receiverExist) {
        return res
          .status(404)
          .json({ success: false, err: "User doesn't exist" });
      }
      const userMessage = await userDetail.findOne(
        {
          // getting rootUser message if the given condition match
          userID: rootUser.userID,
          messages: {
            $elemMatch: {
              messageTo: receiverUserID,
            },
          },
        },
        {
          messages: {
            $elemMatch: {
              messageTo: receiverUserID,
            },
          },
        }
      );
      if (!userMessage) {
        // if message doesn't exist already then we have to create a new message which would contain the empty message
        const roomID = crypto.randomBytes(16).toString("hex");
        // generating new room id for those spacific user room to join on socket
        const resSaveRootMsg = await userDetail.updateOne(
          // creating and saving message to rootUser
          {
            userID: rootUser.userID,
          },
          {
            $push: {
              messages: {
                messageTo: receiverUserID,
                receiverPicture: receiverExist.picture,
                roomID: roomID,
                message: [],
              },
            },
          }
        );
        const resSaverReciverMsg = await userDetail.updateOne(
          // creating and saving message to rootUser
          {
            userID: receiverUserID,
          },
          {
            $push: {
              messages: {
                messageTo: rootUser.userID,
                receiverPicture: rootUser.picture,
                roomID: roomID,
                message: [],
              },
            },
          }
        );
        if (resSaverReciverMsg && resSaveRootMsg) {
          return res
            .status(200)
            .json({ success: true, msg: "message created" });
        } else {
          return res.status(500).json({ success: false, err: "server error" });
        }
      }
      res.status(200).json(userMessage.messages[0]);
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: "Server Error!!, Please Try again letter",
      });
    }
  },
  sendMessage: async (req, res) => {
    // we are including pusher package to make message realtime
    try {
      const rootUser = req.rootUser;
      const receiverUser = req.body.messageTo;
      if (!req.body.messageTo) {
        return res
          .status(401)
          .json({ error: "please fill reciver userID properly" });
      }
      // if message already created then we just have to save
      const resSaveReciverMsg = await userDetail.updateOne(
        // creating and saving message to rootUser
        {
          userID: receiverUser,
        },
        {
          $push: {
            "messages.$[field].message": {
              // pushing message inside the message array which match the condition of "messageBy"==='rootUser.userID'
              sender: rootUser.userID,
              content: req.body.message,
              date: Date(),
            },
          },
        },
        {
          arrayFilters: [{ "field.messageTo": rootUser.userID }],
          // here we are filtering the messageBy
        }
      );
      if (!resSaveReciverMsg.matchedCount) {
        // this will run if update doesn't happen in database it might be because of user doesn't exist
        // NOTE: i am doing this process to reduce the query for database so that the number of query became small and will be fast
        return res
          .status(400)
          .json({ error: "User doesn't exist or Message doesn't created" });
      }
      // if reciver exist and will update the message there then we can update the message for rootuser as well
      const resSaveSenderMsg = await userDetail.updateOne(
        // creating and saving message to rootUser
        {
          userID: rootUser.userID,
        },
        {
          $push: {
            "messages.$[field].message": {
              // pushing message inside the message array which match the condition of "messageBy"==='rootUser.userID'
              sender: rootUser.userID,
              content: req.body.message,
              date: Date(),
            },
          },
        },
        {
          arrayFilters: [{ "field.messageTo": receiverUser }],
          // here we are filtering the messageBy
        }
      );
      // triggering pusher here to create a message
      // pusher.trigger("chat", "message", {
      //   // here we are trigurring only those client whose subscript with `${rootUser.userID} ${receiverUser}`
      //   sender: rootUser.userID,
      //   content: req.body.message,
      //   date: Date(),
      // });
      return res.status(200).json({ message: "message send" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Server Error!!, Please Try again letter" });
    }
  },
};
