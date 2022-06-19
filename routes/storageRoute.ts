/* eslint-disable import/no-unresolved */
import express from "express";
import upload from "../middleware/uploadFile.js";
import storageController from "../controllers/storage.controller.js";
import authenticate from "../middleware/auth/authUsingRedis.js";

const router = express.Router();

router.post("/u/post", [authenticate, upload.single("image")], storageController.post);

router.post("/u/userId", [authenticate, upload.single("profile")], storageController.getUserID);

router.post("/changeProfile/imgFile", [authenticate, upload.single("image")], storageController.changeProfileUsingImgFile);

export default router;
