import uuid from "uuid-v4";
import fs from "fs";
import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import compressFile from "../funcs/compressFile.js";
import storage from "../db/userStorageConnection.js";
import ResponseObject from "../interface/responseObject";
import { Request, Response } from "express";
import constants from "../constants/index.js";
const bucket = storage.bucket();

export default {
  post: async (req: Request, res: Response): Promise<object> => {
    try {
      const rootUser = req.rootUser;
      // console.log(rootUser);
      const caption: string | undefined = req.body.caption;
      const file = req.file;
      // console.log();
      if (!caption && !file) {
        // if user doesn't fill the any filed
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please fill the required field",
        });
      } else if (!file) {
        // if user only fill content field
        // const caption = req.body.caption;
        const postID = crypto.randomBytes(16).toString("hex");
        const userPostDetail = {
          id: postID,
          caption: caption,
          likes: {
            No: 0,
            by: [],
          },
          comments: {
            No: 0,
            by: [],
          },
        };
        const postSuccessFull = await rootUser.uploadPost(
          userPostDetail,
          undefined
        );
        if (postSuccessFull) {
          const resData = {
            ...userPostDetail,
            picture: undefined,
          };
          return res.status(200).json(<ResponseObject>{
            success: true,
            msg: "Post upload successfully",
            data: resData,
          });
        }
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server Error!!, Please Try again later",
        });
      } else {
        // uploading image to firebase Storage
        await compressFile(file.path);
        // deleting uncompressed file after compressed
        fs.unlink(`./db/Images/${file.filename}`, (err) => {});
        const metadata = {
          metadata: {
            firebaseStorageDownloadTokens: uuid(),
          },
          cacheControl: "public, max-age=31536000",
        };
        const uploadRes = await bucket.upload(`./db/build/${file.filename}`, {
          destination: `images/${rootUser.email}/${file.filename}`,
          gzip: true,
          metadata: metadata,
        });
        // here we are again deleting the compressed file after upload to firebase
        fs.unlink(`./db/build/${file.filename}`, (err) => {});
        // console.log(uploadRes);
        const caption = req.body.caption;
        const picName = file.filename;
        const picPath = `images/${rootUser.email}/${file.filename}`;
        const picToken =
          uploadRes[0].metadata.metadata.firebaseStorageDownloadTokens;
        const picBucket = process.env.FIREBASE_STORAGEBUCKET;
        const picUrl = `https://firebasestorage.googleapis.com/v0/b/${picBucket}/o/${encodeURIComponent(
          picPath
        )}?alt=media&token=${picToken}`;
        const postID = crypto.randomBytes(16).toString("hex");
        const today = new Date();
        const userPostDetail = {
          id: postID,
          caption: caption,
          picture: {
            name: picName,
            path: picPath,
            url: picUrl,
            firebaseStorageDownloadToken: picToken,
            bucket: picBucket,
          },
          likes: {
            No: 0,
            by: [],
          },
          comments: {
            No: 0,
            by: [],
          },
        };
        const userStoryDetail = {
          caption: caption,
          picture: picUrl,
          date: `${today.toLocaleString("default", {
            month: "long",
          })} ${today.getDate()}, ${today.getFullYear()}`,
        };
        const postSuccessFull = await rootUser.uploadPost(
          userPostDetail,
          userStoryDetail
        );
        if (postSuccessFull) {
          // const resData = {
          //   useremail: rootUser.email,
          //   username: rootUser.name,
          //   userID: rootUser.userID,
          //   profilePicture: rootUser.picture,
          //   // id: postRes[0].id,
          //   // caption: postRes[0].caption,
          //   // picture: postRes[0].picture,
          //   // likes: postRes[0].likes,
          //   // comments: postRes[0].comments,
          //   ...userPostDetail,
          //   date: new Date(),
          // };
          return res.status(200).json(<ResponseObject>{
            success: true,
            msg: "Post upload successfully",
            data: userPostDetail,
          });
        }

        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "UnAuthorized" });
      }
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
  getUserID: async (req, res) => {
    try {
      const { email, password, userID, auth } = req.body;
      if (auth === "google") {
        // if user is login using google authetication and user doesnot have a password
        if (!email) {
          return res.status(401).json({ success: false, err: "UnAuthorized" });
        }
      } else {
        // if user is register using social account then will have a password
        if (!email && !password) {
          return res.status(401).json({ success: false, err: "UnAuthorized" });
        }
      }
      if (!userID) {
        return res
          .status(400)
          .json({ success: false, err: "Please fill the required field!!!" });
      }
      const userIDExist = await userDetail.findOne(
        { userID: userID },
        { userID: 1, name: 1, email: 1 }
      );
      if (userIDExist) {
        return res.status(409).json({
          success: false,
          err: "Sorry..., UserID already exist",
        });
      } else {
        const rootUser = await userDetail.findOne(
          { email: email },
          {
            name: 1,
            userID: 1,
            email: 1,
            posts: 1,
            stories: 1,
            postNo: 1,
          }
        );
        if (!rootUser) {
          return res.status(401).json({ success: false, err: "UnAuthorized" });
        }
        if (auth !== "google") {
          // if user is login using google authetication and user doesnot have a password
          const isPasswordMatch = await bcrypt.compare(
            password,
            rootUser.password
          );
          if (!isPasswordMatch) {
            return res.status(400).json({
              success: false,
              err: "Email and Password doesn't match",
            });
          }
        }
        if (!req.file) {
          const resData = await userDetail.updateOne(
            { email: email },
            {
              $set: {
                userID: userID,
                picture: constants.defaultNewUserProfilePicture,
              },
            }
          );
          return res
            .status(200)
            .json({ success: true, msg: "Register Successfully" });
        } else {
          await compressFile(req.file.path);
          fs.unlink(`./db/Images/${req.file.filename}`, (err) => {});
          const metadata = {
            metadata: {
              firebaseStorageDownloadTokens: uuid(),
            },
            cacheControl: "public, max-age=31536000",
          };
          const uploadRes = await bucket.upload(
            `./db/build/${req.file.filename}`,
            {
              destination: `images/${rootUser.email}/${req.file.filename}`,
              gzip: true,
              metadata: metadata,
            }
          );
          // here we are again deleting the compressed file after upload to firebase
          fs.unlink(`./db/build/${req.file.filename}`, (err) => {});
          // console.log(uploadRes);
          const userID = req.body.userID;
          const caption = `${userID} Update The Profile Picture`;
          const picName = req.file.filename;
          const picPath = `images/${rootUser.email}/${req.file.filename}`;
          const picToken =
            uploadRes[0].metadata.metadata.firebaseStorageDownloadTokens;
          const picBucket = process.env.FIREBASE_STORAGEBUCKET;
          const picUrl = `https://firebasestorage.googleapis.com/v0/b/${picBucket}/o/${encodeURIComponent(
            picPath
          )}?alt=media&token=${picToken}`;
          // here we also have to post to the feed and also have to save picture as profile
          const postID = crypto.randomBytes(16).toString("hex");
          const today = new Date();
          const userPostDetail = {
            id: postID,
            caption: caption,
            picture: {
              name: picName,
              path: picPath,
              url: picUrl,
              firebaseStorageDownloadToken: picToken,
              bucket: picBucket,
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
            picture: picUrl,
            date: `${today.toLocaleString("default", {
              month: "long",
            })} ${today.getDate()}, ${today.getFullYear()}`,
          };
          // here we are posting user news Feed
          // await rootUser.uploadPost(userPostDetail, userStoryDetail);
          // now we will save picture as profile picture
          await userDetail.updateOne(
            { email: email },
            {
              $set: {
                userID: userID,
                picture: picUrl,
                posts: userPostDetail,
                stories: userStoryDetail,
              },
            }
          );
          res.status(200).json({ success: true, msg: "Register Successfully" });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: "Server Error!!, Please Try again later",
      });
    }
  },
  changeProfileUsingImgFile: async (req: Request, res: Response) => {
    try {
      const rootUser = req.rootUser;
      const file = req.file;
      if (file === undefined) {
        return res.status(400).json({
          success: false,
          msg: "File/ImgUrl Doesn't exist, Please Send us File/ImgUrl",
        });
      }
      await compressFile(file.path);
      fs.unlink(`./db/Images/${file.filename}`, (err) => {});
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuid(),
        },
        cacheControl: "public, max-age=31536000",
      };
      const uploadRes = await bucket.upload(`./db/build/${file.filename}`, {
        destination: `images/${rootUser.email}/${file.filename}`,
        gzip: true,
        metadata: metadata,
      });
      fs.unlink(`./db/build/${file.filename}`, (err) => {});
      const caption = `${rootUser.userID} Update The Profile Picture`;
      const picName = file.filename;
      const picPath = `images/${rootUser.email}/${file.filename}`;
      const picToken =
        uploadRes[0].metadata.metadata.firebaseStorageDownloadTokens;
      const picBucket = process.env.FIREBASE_STORAGEBUCKET;
      const picUrl = `https://firebasestorage.googleapis.com/v0/b/${picBucket}/o/${encodeURIComponent(
        picPath
      )}?alt=media&token=${picToken}`;
      const postID = crypto.randomBytes(16).toString("hex");
      const today = new Date();
      const userPostDetail = {
        id: postID,
        caption: caption,
        picture: {
          name: picName,
          path: picPath,
          url: picUrl,
          firebaseStorageDownloadToken: picToken,
          bucket: picBucket,
        },
        likes: {
          No: 0,
          by: [],
        },
        comments: {
          No: 0,
          by: [],
        },
      };
      const userStoryDetail = {
        caption: caption,
        picture: picUrl,
        date: `${today.toLocaleString("default", {
          month: "long",
        })} ${today.getDate()}, ${today.getFullYear()}`,
      };
      const uploadPostRes = await rootUser.uploadPost(
        userPostDetail,
        userStoryDetail
      );
      if (uploadPostRes) {
        const updateProfilePictureRes = await userDetail.updateOne(
          {
            userID: rootUser.userID,
          },
          { $set: { picture: picUrl } }
        );
        if (updateProfilePictureRes) {
          return res.status(200).json({
            success: true,
            msg: "Successfully Change Profile Picture",
            picture: picUrl,
          });
        }
        return res.status(500).json({
          success: false,
          msg: "Server Error!!, Please Try again later",
        });
      }
      return res.status(500).json({
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
};
