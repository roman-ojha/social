/* eslint-disable import/no-unresolved */
import express from "express";
import session from "express-session";
// eslint-disable-next-line import/extensions
import { passport } from "../middleware/google_OAuth.js";
import googleOAuthController from "../controllers/googleOAuth.controller.js";

// eslint-disable-next-line import/extensions
import("../middleware/google_OAuth.js");

const router = express.Router();

router.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed"
  }),
  // Success url
  googleOAuthController.loginSuccess
);

router.get("/auth/login/success", googleOAuthController.loginSuccess);

router.get("/auth/login/failed", googleOAuthController.loginFail);

export default router;
