import express from "express";
const router = express.Router();
import upload from "../middleware/uploadFile.js";
import storageController from "../controllers/storage.controller.js";
import authenticate from "../middleware/authenticate.js";

router.post("/u/post", upload.single("image"), storageController.post);

router.post("/u/userId", upload.single("profile"), storageController.getUserID);

router.post(
  "/changeProfile/imgFile",
  upload.single("image"),
  storageController.changeProfileUsingImgFile
);

export default router;
