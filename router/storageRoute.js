const express = require("express");
const router = express.Router();
const stgConn = require("../db/userStorageConnection");
const upload = require("../middleware/uploadFile");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userDetail = require("../models/userDetail_model");
let gfs;
stgConn.once("open", function () {
  gfs = Grid(stgConn.db, mongoose.mongo);
  gfs.collection("userstorage");
  console.log("Stroge DB connection Successful");
});

// @route POST /upload
// @desc Uploads file to DB
router.post("/u/post", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await userDetail.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!userData) {
      return res
        .status(400)
        .json({ error: "Sorry!! user is not autheticated" });
    }
    const { content } = req.body;
    const picture = req.filename;
    const postData = {
      content: content,
      picture: picture,
    };
    const data = await userData.uploadPost(postData);
    return res.status(200).json({ message: "Post successfully" });
  } catch (err) {}
  res.send("Hello");
});

module.exports = router;
