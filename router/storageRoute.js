import express from "express";
import storage from "../db/userStorageConnection.js";
const router = express.Router();
import upload from "../middleware/uploadFile.js";
import uuid from "uuid-v4";
import imagemin from "imagemin";
import isJpg from "is-jpg";
import sharp from "sharp";
import mozjpeg from "imagemin-mozjpeg";
import fs from "fs";
import jwt from "jsonwebtoken";
import userDetail from "../models/userDetail_model.js";
const bucket = storage.bucket();
const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }
  return sharp(input).jpeg().toBuffer();
};
const compressFile = async (filePath) => {
  await imagemin([filePath], {
    destination: "../db/build",
    plugins: [convertToJpg, mozjpeg({ quality: 70 })],
  });
};
router.post("/u/post", upload.single("image"), async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await userDetail.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!req.body.content && !req.file) {
      // if user doesn't fill the any filed
      return res.status(401).json({ error: "Please fill the post properly" });
    } else if (req.body.content && !req.file) {
      // if user only fill content field
      if (rootUser) {
        const content = req.body.content;
        const userPostDetail = {
          content: content,
        };
        const postRes = await rootUser.uploadPost(userPostDetail);
        console.log(postRes);
        const resData = {
          useremail: rootUser.email,
          username: rootUser.name,
          userID: rootUser.userID,
          content: postRes[0].content,
          pictureUrl: "",
          like: postRes[0].like,
          date: postRes[0].date,
        };
        return res.status(201).json(resData);
      } else {
        return res.status(401).json({ error: "Authetication error" });
      }
    } else {
      // if user fill both field
      const token = req.cookies.AuthToken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await userDetail.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      // console.log(rootUser);
      if (rootUser) {
        // uploading image to firebase Storage
        await compressFile(req.file.path);
        // deleting uncompressed file after compressed
        fs.unlink(`../db/Images/${req.file.filename}`, (err) => {});
        const metadata = {
          metadata: {
            firebaseStorageDownloadTokens: uuid(),
          },
          cacheControl: "public, max-age=31536000",
        };
        const uploadRes = await bucket.upload(
          `../db/build/${req.file.filename}`,
          {
            destination: `images/${rootUser.email}/${req.file.filename}`,
            gzip: true,
            metadata: metadata,
          }
        );
        // here we are again deleting the compressed file after upload to firebase
        fs.unlink(`../db/build/${req.file.filename}`, (err) => {});
        // console.log(uploadRes);
        const content = req.body.content;
        const picName = req.file.filename;
        const picPath = `images/${rootUser.email}/${req.file.filename}`;
        const picToken =
          uploadRes[0].metadata.metadata.firebaseStorageDownloadTokens;
        const picBucket = process.env.FIREBASE_STORAGEBUCKET;
        const picUrl = `https://firebasestorage.googleapis.com/v0/b/${picBucket}/o/${encodeURIComponent(
          picPath
        )}?alt=media&token=${picToken}`;
        const userPostDetail = {
          content: content,
          picture: {
            name: picName,
            path: picPath,
            url: picUrl,
            firebaseStorageDownloadToken: picToken,
            bucket: picBucket,
          },
        };
        const postRes = await rootUser.uploadPost(userPostDetail);
        const resData = {
          useremail: rootUser.email,
          username: rootUser.name,
          userID: rootUser.userID,
          content: postRes[0].content,
          pictureUrl: postRes.picture.url,
          like: postRes[0].like,
          date: postRes[0].date,
        };
        return res.status(201).json(resData);
      } else {
        return res.status(401).json({ error: "Authetication error" });
      }
    }
  } catch (err) {}
});

export default router;
