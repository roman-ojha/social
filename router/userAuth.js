import express from "express";
import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
import authenticate from "../middleware/authenticate.js";
import crypto from "crypto";
const userAuthRoute = express.Router();

userAuthRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword, birthday, gender } = req.body;
    if (!name || !email || !password || !cpassword || !birthday || !gender) {
      return res
        .status(422)
        .json({ success: false, err: "Please Fill all Required Field!!!" });
    }
    if (password !== cpassword) {
      return res
        .status(422)
        .json({ success: false, err: "Password doesn't match" });
    }
    const emailExist = await userDetail.findOne({ email: email });
    if (emailExist) {
      return res
        .status(422)
        .json({ success: false, err: "Email already Exist" });
    }
    const id = crypto.randomBytes(16).toString("hex");
    const creatingNewUserData = new userDetail({
      id,
      name,
      email,
      password,
      cpassword,
      birthday,
      cpassword,
      gender,
      followersNo: 0,
      followingNo: 0,
      postNo: 0,
      friendsNo: 0,
      storiesNo: 0,
    });
    const saveUserRes = await creatingNewUserData.save();
    if (!saveUserRes) {
      return res
        .status(500)
        .json({ success: false, err: "Server Error!,Failed registerd!!!" });
    }
    let token;
    token = await saveUserRes.generateAuthToken();
    res.cookie("AuthToken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ success: true, msg: "User register successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, err: "Server Error!,Failed registerd!!!" });
  }
});

userAuthRoute.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, err: "Please filled the form properly!!!" });
    }
    const userLogin = await userDetail.findOne({ email: email });
    if (!userLogin) {
      return res
        .status(404)
        .json({ success: false, err: "Error Login! User does't exist" });
    } else {
      const isPasswordMatch = await bcrypt.compare(
        password,
        userLogin.password
      );
      if (!isPasswordMatch) {
        res.status(403).json({
          success: false,
          err: "Email and password doesn't match",
        });
      } else {
        let token = await userLogin.generateAuthToken();
        res.cookie("AuthToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ success: true, msg: "Login Successfully" });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: "Server Error!!, Please Try again letter",
    });
  }
});

userAuthRoute.get("/u/logout", authenticate, (req, res) => {
  res.clearCookie("AuthToken", { path: "/" });
  res.status(200).send("User Logout");
});

export default userAuthRoute;
