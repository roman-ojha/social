import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import ResponseObject from "interface/responseObject.js";

export default {
  changeProfilePicture: async (
    req: Request,
    res: Response
  ): Promise<object> => {
    try {
      const imageUrl = req.body.imageUrl;
      const rootUser = req.rootUser;
      if (!imageUrl) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please Fill Image URL",
        });
      }
      const caption = `${rootUser.userID} Update The Profile Picture`;
      const postID = crypto.randomBytes(16).toString("hex");
      const today = new Date();
      const userPostDetail = {
        id: postID,
        caption: caption,
        picture: {
          url: imageUrl,
        },
        likes: {
          No: 0,
        },
        comments: {
          No: 0,
        },
      };
      const userStoryDetail = {
        caption: caption,
        picture: imageUrl,
        date: `${today.toLocaleString("default", {
          month: "long",
        })} ${today.getDate()}, ${today.getFullYear()}`,
      };
      await rootUser.uploadPost(userPostDetail, userStoryDetail);
      await userDetail.updateOne(
        {
          userID: rootUser.userID,
        },
        {
          $set: {
            picture: imageUrl,
          },
        }
      );
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successfully Change Profile Picture",
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "server Error, Please try again later!!!",
      });
    }
  },
  changeUserID: async (req: Request, res: Response): Promise<object> => {
    try {
      const newUserID = req.body.newUserID;
      const oldUserID = req.rootUser.userID;
      if (!newUserID) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please Fill the userID Field",
        });
      }
      const userIDAlreadyExist = await userDetail.findOne(
        {
          userID: newUserID,
        },
        {
          name: 1,
          userID: 1,
          email: 1,
        }
      );
      if (userIDAlreadyExist) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "given userID already Exist, Please Try another one",
        });
      }
      const changeUserIDRes = await userDetail.updateOne(
        {
          userID: oldUserID,
        },
        { $set: { userID: newUserID } }
      );
      if (changeUserIDRes) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "Successfully Changed userID",
          userID: newUserID,
        });
      }
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "server Error, Please try again later!!!",
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "server Error, Please try again later!!!",
      });
    }
  },
  changeName: async (req: Request, res: Response): Promise<object> => {
    try {
      const newName = req.body.newName;
      const rootUser = req.rootUser;
      if (!newName) {
        return res
          .status(400)
          .json({ success: false, msg: "Please Fill the displayName Field" });
      }
      const changeNameRes = await userDetail.updateOne(
        {
          userID: rootUser.userID,
        },
        { $set: { name: newName } }
      );
      if (changeNameRes) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "Successfully Changed display Name",
          name: newName,
        });
      }
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "server Error, Please try again later!!!",
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "server Error, Please try again later!!!",
      });
    }
  },
  changePassword: async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword, cNewPassword } = req.body;
      if (!cNewPassword || !oldPassword || !newPassword) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please fill the field properly",
        });
      }
      if (newPassword !== cNewPassword) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "password doesn't match",
        });
      }
      const nPassword = await bcrypt.hash(newPassword, 12);
      const userRes = await userDetail.findOne(
        {
          userID: req.rootUser.userID,
        },
        {
          password: 1,
        }
      );
      if (!userRes) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "UnAuthorized User" });
      }
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userRes.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Old Password is incorrect",
        });
      }
      const changePassRes = await userDetail.updateOne(
        {
          userID: req.rootUser.userID,
        },
        {
          $set: { password: nPassword, cpassword: nPassword },
        }
      );
      if (!changePassRes) {
        return res
          .status(500)
          .json(<ResponseObject>{ success: false, msg: "Server Error" });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Changed Password Successfully",
      });
    } catch (err) {
      return res
        .status(500)
        .json(<ResponseObject>{ success: false, msg: "Server Error" });
    }
  },
};
