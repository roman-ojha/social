import express from "express";
import authenticate from "../middleware/authenticate.js";
import userAuth from "../controllers/userAuth.controller.js";
const userAuthRoute = express.Router();

userAuthRoute.post("/register", userAuth.register);

userAuthRoute.post("/signin", userAuth.signIn);

userAuthRoute.get("/u/logout", authenticate, userAuth.logOut);

export default userAuthRoute;
