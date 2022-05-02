import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import session from "express-session";
const router = express.Router();
import("../middleware/google_OAuth.js");
import google_OAuth from "../controllers/googleOAuth.controller.js";

router.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

router.get("/auth/login/success", google_OAuth.loginSuccess);

router.get("/auth/login/failed", google_OAuth.loginFail);

export default router;
