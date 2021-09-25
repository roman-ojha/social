// import express from "express";
// const router = express.Router();
// import stgConn from "../db/userStorageConnection.js";
// import upload from "../middleware/uploadFile.js";
// import Grid from "gridfs-stream";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import userDetail from "../models/userDetail_model.js";
// let gfs;
// stgConn.once("open", function () {
//   gfs = Grid(stgConn.db, mongoose.mongo);
//   gfs.collection("userstorage");
//   console.log("Stroge DB connection Successful");
// });

// // @route POST /upload
// // @desc Uploads file to DB
// router.post("/u/post", upload.single("image"), async (req, res) => {
//   try {
//     console.log(req.file);
//     const token = req.cookies.AuthToken;
//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//     const userData = await userDetail.findOne({
//       _id: verifyToken._id,
//       "tokens.token": token,
//     });
//     if (!userData) {
//       return res
//         .status(400)
//         .json({ error: "Sorry!! user is not autheticated" });
//     }
//     const { content } = req.body;
//     const picture = req.filename;
//     const postData = {
//       content: content,
//       picture: picture,
//     };
//     const data = await userData.uploadPost(postData);
//     return res.status(200).json({ message: "Post successfully" });
//   } catch (err) {}
//   res.send("Hello");
// });

// export default router;

import express from "express";
import storage from "../db/userStorageConnection.js";
const router = express.Router();
import upload from "../middleware/uploadFile.js";
import uuid from "uuid-v4";
const bucket = storage.bucket();
const metadata = { contentType: "image/jpeg; charset=utf-8" };
router.post("/u/post", upload.single("image"), async (req, res) => {
  // console.log(req.file);
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: "image/png",
    cacheControl: "public, max-age=31536000",
  };
  const data = await bucket.upload(req.file.path, {
    gzip: true,
    metadata: metadata,
  });
  // console.log(req.file);
  console.log(data);
  res.send("Sending");
});

export default router;
