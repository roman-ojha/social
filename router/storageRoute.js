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
const bucket = storage.bucket();
const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }
  return sharp(input).jpeg().toBuffer();
};
const compressFile = async (filePath) => {
  const minFile = await imagemin([filePath], {
    destination: "../db/build",
    plugins: [convertToJpg, mozjpeg({ quality: 70 })],
  });
  return minFile;
};

router.post("/u/post", upload.single("image"), async (req, res) => {
  await compressFile(req.file.path);
  // deleting uncompressed file after compressed
  fs.unlink(`../db/Images/${req.file.filename}`, (err) => {});
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    cacheControl: "public, max-age=31536000",
  };
  const file = await bucket.upload(`../db/build/${req.file.filename}`, {
    destination: `images/${req.file.filename}`,
    gzip: true,
    metadata: metadata,
  });
  // here we are again deleting the compressed file after upload to firebase
  fs.unlink(`../db/build/${req.file.filename}`, (err) => {});
  console.log(file);
  res.send("Sending");
});

export default router;
