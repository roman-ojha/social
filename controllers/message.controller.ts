import userDetail from "../models/userDetail_model.js";
import crypto from "crypto";
import { Request, Response } from "express";
import ResponseObject from "../interface/responseObject.js";
import { UserDocumentMessages } from "../interface/userDocument.js";
import SchemaMethodInstance from "../interface/userSchemaMethods.js";

export default {
  createMessage: async (req: Request, res: Response): Promise<object> => {
    try {
      const rootUser = req.rootUser;
      const receiverUser = req.body.receiver;
      if (!req.body.receiver) {
        return res.status(401).json({ error: "receiver Doesn't exist" });
      }
      const receiverExist = await userDetail.findOne(
        {
          // searching that user to message if it exist
          userID: receiverUser,
        },
        {
          email: 1,
          userID: 1,
          name: 1,
        }
      );
      if (!receiverExist) {
        return res.status(400).json({ error: "User doesn't exist" });
      }
      const messageExist = await userDetail.findOne(
        {
          userID: rootUser.userID,
          messages: {
            $elemMatch: {
              messageTo: receiverUser,
            },
          },
        },
        {
          email: 1,
          userID: 1,
          name: 1,
        }
      );
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
  getSingleUserMessage: async (
    req: Request,
    res: Response
  ): Promise<object> => {
    try {
      const rootUser = req.rootUser;
      const receiverUserID = req.body.userID;
      const messageToId = req.body.id;
      if (!receiverUserID) {
        return res.status(404).json(<ResponseObject>{
          success: false,
          msg: "Receiver user doesn't exist",
        });
      }
      const receiverExist = await userDetail.findOne(
        {
          // searching that user to message if it exist
          id: messageToId,
        },
        {
          name: 1,
          userID: 1,
          email: 1,
        }
      );
      if (!receiverExist) {
        return res
          .status(404)
          .json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      const userMessage = await userDetail.findOne(
        {
          // getting rootUser message if the given condition match
          id: rootUser.id,
          messages: {
            $elemMatch: {
              messageToId: messageToId,
            },
          },
        },
        {
          messages: {
            $elemMatch: {
              messageToId: messageToId,
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
            id: rootUser.id,
          },
          {
            $push: {
              messages: {
                messageToId: messageToId,
                roomID: roomID,
                message: [],
              },
            },
          }
        );
        const resSaverReceiverMsg = await userDetail.updateOne(
          // creating and saving message to rootUser
          {
            userID: receiverUserID,
          },
          {
            $push: {
              messages: {
                messageToId: rootUser.id,
                roomID: roomID,
                message: [],
              },
            },
          }
        );
        if (resSaverReceiverMsg && resSaveRootMsg) {
          return res
            .status(200)
            .json(<ResponseObject>{ success: true, msg: "message created" });
        } else {
          return res
            .status(500)
            .json(<ResponseObject>{ success: false, msg: "server error" });
        }
      }
      return res.status(200).json(userMessage.messages[0]);
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again letter",
      });
    }
  },
  getRootUserMessages: async (req: Request, res: Response) => {
    try {
      const rootUser = req.rootUser;
      const resObj = await userDetail.findOne(
        {
          userID: rootUser.userID,
        },
        {
          // messages: { $slice: -10 },
          "messages.message": { $slice: -2 },
          notification: 0,
          password: 0,
          cpassword: 0,
          email: 0,
          id: 0,
          name: 0,
          birthday: 0,
          stories: 0,
          followersNo: 0,
          followingNo: 0,
          followers: 0,
          followings: 0,
          following: 0,
          friendsNo: 0,
          friends: 0,
          postNo: 0,
          posts: 0,
          tokens: 0,
          gender: 0,
          date: 0,
          picture: 0,
          userID: 0,
          _id: 0,
        }
      );
      if (!resObj) {
        return res
          .status(404)
          .json(<ResponseObject>{ success: false, msg: "User not Found" });
      }
      const messageToIds = resObj.messages.map((el) => el.messageToId);
      // only getting id all of all the messageToId to get userID and picture dynamically
      const messages = resObj.messages;
      const resUser = await userDetail.find(
        { id: { $in: messageToIds } },
        {
          _id: 0,
          userID: 1,
          picture: 1,
          id: 1,
        }
      );

      // Merging Array
      const mergeArrays = (
        messages: UserDocumentMessages[],
        resUser: (SchemaMethodInstance & {
          _id: any;
        })[]
      ) => {
        return messages.map((obj) => {
          const user = resUser.filter((nums) => nums.id === obj.messageToId);
          if (!user.length) {
            // obj.phone = numbers;
            return obj;
          }
          const newUser = user.map((num) => ({
            picture: num.picture,
            userID: num.userID,
          }));
          const newObj = {
            lastMessageOn: obj.lastMessageOn,
            messageToId: obj.messageToId,
            roomID: obj.roomID,
            message: obj.message,
            receiverPicture: newUser[0].picture,
            messageToUserId: newUser[0].userID,
          };
          return newObj;
        });
      };

      const finalMessages = mergeArrays(messages, resUser);
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successfull",
        messages: finalMessages,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again letter",
      });
    }
  },
  sendMessage: async (req: Request, res: Response): Promise<object> => {
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
