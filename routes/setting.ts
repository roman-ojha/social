/* eslint-disable import/no-unresolved */
import express from "express";
// import authenticate from "../middleware/auth/authenticate.js";
import authenticate from "../middleware/auth/authUsingRedis.js";
import settingController from "../controllers/setting.controller.js";

const settingRoute = express.Router();

settingRoute.post("/changeProfile/imgUrl", authenticate, settingController.changeProfilePicture);

settingRoute.post("/changeUserID", authenticate, settingController.changeUserID);

settingRoute.post("/changeName", authenticate, settingController.changeName);

settingRoute.post("/changePassword", authenticate, settingController.changePassword);

export default settingRoute;
