const express = require("express");
const passport = require("passport");
const session = require("express-session");
const router = express.Router();
require("../middleware/google_OAuth");
const isLoogedIn = require("../middleware/google_OAuth");
const authenticate = require("../middleware/authenticate");
const UserDetail = require("../models/userDetail_model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

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

router.get("/auth/login/success", async (req, res) => {
  // here if user login form google after that we are finding the email of that on data base and generating token for that user and after that store that token in cookie
  // and after that we are redirecting to the homepage after that there we will check the does token get match or not if it get match then we will send the data from the user into the home page
  console.log(req.user);
  const userLogin = await UserDetail.findOne({ email: req.user.email });
  try {
    let token;
    token = await userLogin.generateAuthToken();
    res.cookie("AuthToken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    res.redirect(CLIENT_HOME_PAGE_URL);
  } catch (err) {
    console.log(err);
  }
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({ error: "Something went wrong, try again letter..." });
});

module.exports = router;
