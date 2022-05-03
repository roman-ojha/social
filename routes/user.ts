import express from "express";
import authenticate from "../middleware/authenticate.js";
import userController from "../controllers/user.controller.js";
const userRoute = express.Router();

userRoute.get("/", authenticate, userController.main);

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

export default userRoute;
