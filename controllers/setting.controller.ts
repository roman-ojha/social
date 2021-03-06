import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import ResponseObject from "../interface/responseObject.js";
import updateRedisUser from "../funcs/updateRedisUser.js";
import uploadPost from "../funcs/uploadPost.js";
import makeStandardUserID from "../funcs/makeStandardUserID.js";
import PasswordValidator from "password-validator";
import validator from "validator";

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
      // await rootUser.uploadPost(userPostDetail, userStoryDetail);
      const postSuccessRes = await uploadPost(
        userPostDetail,
        userStoryDetail,
        rootUser.id
      );
      if (!postSuccessRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "server Error, Please try again later!!!",
        });
      }
      const updateProfilePictureRes = await userDetail.updateOne(
        {
          userID: rootUser.userID,
        },
        {
          $set: {
            picture: imageUrl,
          },
        }
      );
      if (!updateProfilePictureRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "server Error, Please try again later!!!",
        });
      }
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
      let newUserID: string = req.body.newUserID;
      newUserID = makeStandardUserID(newUserID);
      const oldUserID = req.rootUser.userID;
      if (!newUserID) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please Fill the userID Field",
        });
      }
      if (!validator.matches(newUserID, "^[a-zA-Z0-9_-]*$")) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Try to avoid special symbols, not a valid userID",
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
      // we will change display name only after redis user data get updated rather we will not going to update mongodb database
      const isRedisUserUpdated = await updateRedisUser(
        req.rootUser.id,
        "userID",
        newUserID
      );
      if (!isRedisUserUpdated) {
        return res.status(500).json({
          success: false,
          msg: "Sorry for the inconvenient, Server Error, can't be able to update userID or name. Please create new issues on github repository!!!",
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
      if (newName.length < 5 || newName.length > 20) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Please input full name between 5 - 20 characters length",
        });
      }
      // we will change display name only after redis user data get updated rather we will not going to update mongodb database
      const isRedisUserUpdated = await updateRedisUser(
        req.rootUser.id,
        "name",
        newName
      );
      if (!isRedisUserUpdated) {
        return res.status(500).json({
          success: false,
          msg: "Sorry for the inconvenient, Server Error, can't be able to update userID or name. Please create new issues on github repository!!!",
        });
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
      const p_validator = new PasswordValidator();
      p_validator.has().spaces();
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

      if (newPassword.length < 5 || newPassword.length > 30) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Please input password between 5 - 30 characters length",
        });
      }
      if (p_validator.validate(newPassword)) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Please can't contain space",
        });
      }
      const nPassword = await bcrypt.hash(newPassword, 12);
      const userRes = await userDetail.findOne(
        {
          userID: req.rootUser.userID,
        },
        {
          password: 1,
          googleID: 1,
        }
      );
      if (!userRes) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Error!! User does't exist",
        });
      }
      if (userRes.googleID) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "It looks like You had create account using googleAuth, so can't be able to change password",
        });
      }
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
      if (oldPassword === newPassword) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Sorry you can't set old password as new password",
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
