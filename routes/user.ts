import express from "express";
import authenticate from "../middleware/auth/authenticate.js";
import userController from "../controllers/user.controller.js";
const userRoute = express.Router();

userRoute.get("/index", authenticate, userController.main);

userRoute.get("/u", authenticate, userController.homeUser);

userRoute.get(
  "/u/profile/:userid",
  authenticate,
  userController.getUserProfile
);

userRoute.post("/u/search", userController.search);

// this is for user follow logic if both of them follow then they will be as a friends
userRoute.post("/u/follow", authenticate, userController.followUser);

userRoute.post("/u/unfollow", authenticate, userController.unFollowUser);

userRoute.get(
  "/u/notification",
  authenticate,
  userController.getNotificationData
);

userRoute.get("/u/getFriends/:id", userController.getFriends);

userRoute.get("/u/getFollowers/:id", userController.getFollowers);

userRoute.get("/u/getFollowings/:id", userController.getFollowings);
export default userRoute;
