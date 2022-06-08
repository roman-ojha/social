import express from "express";
// import authenticate from "../middleware/auth/authenticate.js";
import authenticate from "../middleware/auth/authUsingRedis.js";
import userAuthController from "../controllers/userAuth.controller.js";
const userAuthRoute = express.Router();

userAuthRoute.post("/register", userAuthController.register);

userAuthRoute.post("/signin", userAuthController.signIn);

userAuthRoute.get("/u/logout", authenticate, userAuthController.logOut);

export default userAuthRoute;
