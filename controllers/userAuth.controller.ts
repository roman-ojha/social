import userDetail from "../models/userDetail_model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import ResponseObject from "../interface/responseObject.js";
import { __prod__ } from "../constants/env.js";
import { signInAdmin } from "../funcs/AuthAdmin.js";
import SchemaMethodInstance from "../interface/userSchemaMethods.js";
import {
  UserDocumentFollower,
  UserDocumentFollowing,
  UserDocumentFriends,
  UserDocumentMessages,
  UserDocumentNotification,
} from "../interface/userDocument.js";
import setRedisUserData from "../funcs/setRedisUserData.js";

export default {
  register: async (req: Request, res: Response): Promise<object> => {
    try {
      const { name, email, password, cpassword, birthday, gender } = req.body;
      if (!name || !email || !password || !cpassword || !birthday || !gender) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please Fill all Required Field!!!",
        });
      }
      if (password !== cpassword) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Password doesn't match",
        });
      }
      const emailExist = await userDetail.findOne(
        { email: email },
        { name: 1, userID: 1, email: 1 }
      );
      if (emailExist) {
        return res
          .status(409)
          .json(<ResponseObject>{ success: false, msg: "Email already Exist" });
      }
      // Add Admin User as friend and add notification and send message form Admin User to every registered User
      const adminEmail = process.env.ADMIN_LOGIN_EMAIL;
      const adminPassword = process.env.ADMIN_LOGIN_PASSWORD;
      const adminCpassword = process.env.ADMIN_LOGIN_PASSWORD;
      const resAdmin = await signInAdmin({
        email: adminEmail,
        password: adminPassword,
        cpassword: adminCpassword,
      });
      const newUserId = crypto.randomBytes(16).toString("hex");
      if (resAdmin.success && resAdmin.admin) {
        // if Admin Exist
        const newUser: SchemaMethodInstance & {
          _id: any;
        } = new userDetail({
          id: newUserId,
          name,
          email,
          password,
          cpassword,
          birthday,
          gender,
          postNo: 0,
          followingNo: 1,
          following: [
            <UserDocumentFollowing>{
              id: resAdmin.admin.id,
            },
          ],
          followersNo: 1,
          followers: [
            <UserDocumentFollower>{
              id: resAdmin.admin.id,
            },
          ],
          friendsNo: 1,
          friends: [
            <UserDocumentFriends>{
              id: resAdmin.admin.id,
            },
          ],
          notification: [
            <UserDocumentNotification>{
              topic: "follow",
              user: resAdmin.admin.id,
            },
          ],
          messages: [
            <UserDocumentMessages>{
              lastMessageOn: new Date(),
              messageToId: resAdmin.admin.id,
              message: [
                {
                  senderId: resAdmin.admin.id,
                  content: `Hello ${name}`,
                  date: new Date(),
                },
              ],
            },
          ],
        });
        const saveUserWithAdmin = await newUser.save();
        if (!saveUserWithAdmin) {
          return res.status(500).json(<ResponseObject>{
            success: false,
            msg: "Server Error!,Failed registerd!!!",
          });
        }
        const updateAdminDocument = await userDetail.updateOne(
          {
            id: resAdmin.admin.id,
          },
          {
            // pushing the new followers into followed to user database
            $push: {
              followers: <UserDocumentFollower>{
                id: newUserId,
              },
              following: <UserDocumentFollowing>{
                id: newUserId,
              },
              friends: <UserDocumentFriends>{
                id: newUserId,
              },
              messages: <UserDocumentMessages>{
                lastMessageOn: new Date(),
                messageToId: newUserId,
                message: [
                  {
                    senderId: resAdmin.admin.id,
                    content: `Hello ${name}`,
                    date: new Date(),
                  },
                ],
              },
              notification: <UserDocumentNotification>{
                topic: "follow",
                user: newUserId,
              },
            },
            $inc: {
              followersNo: 1,
              followingNo: 1,
              friendsNo: 1,
            },
          }
        );
        if (!updateAdminDocument) {
          return res.status(500).json(<ResponseObject>{
            success: false,
            msg: "Server Error!,Failed registered!!!",
          });
        }
        let token: string | null;
        token = await saveUserWithAdmin.generateAuthToken();
        if (token) {
          res.cookie("AuthToken", token, {
            // expires: new Date(Date.now() + 25892000000),
            maxAge: 25892000000,
            httpOnly: true,
            domain: process.env.ORIGIN_HOSTNAME,
            secure: true,
            // signed: true,
            sameSite: "none",
          });
        }
        await setRedisUserData({
          email: email,
          name: name,
          id: newUserId,
          tokens: [{ token: token as string }],
        });
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "User register successfully",
        });
      }
      const newUser: SchemaMethodInstance & {
        _id: any;
      } = new userDetail({
        id: newUserId,
        name,
        email,
        password,
        cpassword,
        birthday,
        gender,
        followersNo: 0,
        followingNo: 0,
        postNo: 0,
        friendsNo: 0,
      });
      const saveUserRes = await newUser.save();
      if (!saveUserRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server Error!,Failed registered!!!",
        });
      }
      let token: string | null;
      token = await saveUserRes.generateAuthToken();
      if (token) {
        res.cookie("AuthToken", token, {
          // expires: new Date(Date.now() + 25892000000),
          maxAge: 25892000000,
          httpOnly: true,
          domain: process.env.ORIGIN_HOSTNAME,
          secure: true,
          // signed: true,
          sameSite: "none",
        });
      }
      await setRedisUserData({
        id: newUserId,
        email: email,
        name: name,
        tokens: [{ token: token as string }],
      });
      // NOTE: cause i have hosted client app on vercel and server on heroku and Cookies are not cross-domain compatible. if it was, it would be a serious security issue. So that we have to pass the token as response object
      // Warning: But in my opinion this might not be the best way to authenticate user
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "User register successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: "Server Error!!,Please try again later",
      });
    }
  },
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please filled the form properly!!!",
        });
      }
      const userLogin = await userDetail.findOne(
        { email: email },
        {
          email: 1,
          password: 1,
          userID: 1,
          name: 1,
          tokens: { $slice: -5 },
          id: 1,
        }
      );
      if (!userLogin) {
        return res.status(404).json(<ResponseObject>{
          success: false,
          msg: "Error Login! User does't exist",
        });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          userLogin.password
        );
        if (!isPasswordMatch) {
          res.status(403).json(<ResponseObject>{
            success: false,
            msg: "Email and password doesn't match",
          });
        } else {
          let token: string | null = await userLogin.generateAuthToken();
          if (token) {
            res.cookie("AuthToken", token, {
              maxAge: 25892000000,
              httpOnly: true,
              domain: process.env.ORIGIN_HOSTNAME,
              // domain: the domain that we pass here is the domain where cookie get stored and domain is the domain of the server
              secure: true,
              // signed: true,
              sameSite: "none",
              // NOTE: 'sameSite: "none"' will help to set and access token for different domain
            });
          }

          // Storing User Data in redis
          await setRedisUserData({
            id: userLogin.id,
            email: userLogin.email,
            name: userLogin.name,
            userID: userLogin.userID,
            tokens: userLogin.tokens,
          });

          // NOTE: if we would host hosted client app on vercel and server on heroku and Cookies are not cross-domain compatible. if it was, it would be a serious security issue. So that we have to pass the token as response object
          return res.status(200).json(<ResponseObject>{
            success: true,
            msg: "Login Successfully",
          });
        }
      }
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
  logOut: (req: Request, res: Response) => {
    try {
      res.clearCookie("AuthToken", {
        httpOnly: true,
        domain: process.env.ORIGIN_HOSTNAME,
        path: "/",
        secure: true,
        sameSite: "none",
      });
      return res
        .status(200)
        .json(<ResponseObject>{ success: true, msg: "You are Logged Out" });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
};
