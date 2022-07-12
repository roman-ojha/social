import uuid from "uuid-v4";
import fs from "fs";
import UserDetail from "../models/userDetail_model.js";
import crypto from "crypto";
import compressFile from "../funcs/compressFile.js";
import storage from "../db/userStorageConnection.js";
import ResponseObject from "../interface/responseObject";
import { Request, Response } from "express";
import constants from "../constants/index.js";
import UserDocument, { UserDocumentPosts } from "../interface/userDocument.js";
import uploadPost from "../funcs/uploadPost.js";
import setRedisUserData from "../funcs/setRedisUserData.js";
const bucket = storage.bucket();
import makeStandardUserID from "../funcs/makeStandardUserID.js";
import validator from "validator";

export default {
  post: async (req: Request, res: Response): Promise<object> => {
    try {
      const rootUser: UserDocument = req.rootUser;
      const caption: string | undefined = req.body.caption;
      const file = req.file;
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
        const postSuccessRes = await uploadPost(
          userPostDetail,
          undefined,
          rootUser.id
        );
        if (postSuccessRes) {
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
        const userPostDetail = <UserDocumentPosts>{
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
        const postSuccessRes = await uploadPost(
          userPostDetail,
          userStoryDetail,
          rootUser.id
        );
        if (postSuccessRes) {
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
      let { userID }: { userID: string } = req.body;
      const alreadyHaveUserID = req.rootUser.userID;
      if (alreadyHaveUserID) {
        return res.status(400).json({
          success: false,
          err: "You already added UserID from this page, if you want to change it you can change through setting page",
        });
      }
      userID = makeStandardUserID(userID);
      const rootUser = req.rootUser;
      if (!userID) {
        return res
          .status(400)
          .json({ success: false, err: "Please fill the required field!!!" });
      }
      if (!validator.matches(userID, "^[a-zA-Z0-9_.-]*$")) {
        return res.status(400).json({
          success: false,
          err: "Try to avoid special symbols, not a valid userID",
        });
      }
      const userIDExist = await UserDetail.findOne(
        { userID: userID },
        { userID: 1, name: 1, email: 1 }
      );
      if (userIDExist) {
        return res.status(409).json({
          success: false,
          err: "Sorry UserID already exist, Please try another one",
        });
      } else {
        const resRootUser = await UserDetail.findOne(
          { id: rootUser.id },
          {
            name: 1,
            userID: 1,
            email: 1,
            posts: 1,
            stories: 1,
            tokens: { $slice: -5 },
            postNo: 1,
            id: 1,
            googleID: 1,
          }
        );
        if (!resRootUser) {
          return res.status(401).json({ success: false, err: "UnAuthorized" });
        }
        if (!req.file) {
          if (resRootUser.googleID) {
            // if user is auth through google oauth
            await UserDetail.updateOne(
              { id: rootUser.id },
              {
                $set: {
                  userID: userID,
                },
              }
            );
          } else {
            await UserDetail.updateOne(
              { id: rootUser.id },
              {
                $set: {
                  userID: userID,
                  picture: constants.defaultNewUserProfilePicture,
                },
              }
            );
          }
          await setRedisUserData({
            id: resRootUser.id,
            email: resRootUser.email,
            name: resRootUser.name,
            userID: userID,
            tokens: resRootUser.tokens,
          });
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
              destination: `images/${resRootUser.email}/${req.file.filename}`,
              gzip: true,
              metadata: metadata,
            }
          );
          // here we are again deleting the compressed file after upload to firebase
          fs.unlink(`./db/build/${req.file.filename}`, (err) => {});
          const userID = req.body.userID;
          const caption = `${userID} Update The Profile Picture`;
          const picName = req.file.filename;
          const picPath = `images/${resRootUser.email}/${req.file.filename}`;
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
          // now we will save picture as profile picture
          await UserDetail.updateOne(
            { id: rootUser.id },
            {
              $set: {
                userID: userID,
                picture: picUrl,
                posts: userPostDetail,
                stories: userStoryDetail,
              },
            }
          );

          // update redis with userID
          await setRedisUserData({
            id: resRootUser.id,
            email: resRootUser.email,
            name: resRootUser.name,
            userID: userID,
            tokens: resRootUser.tokens,
          });
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
      const rootUser: UserDocument = req.rootUser;
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
      const uploadPostRes = await uploadPost(
        userPostDetail,
        userStoryDetail,
        rootUser.id
      );
      if (uploadPostRes) {
        const updateProfilePictureRes = await UserDetail.updateOne(
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
