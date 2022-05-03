import userDetail from "../models/userDetail_model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import ResponseObject from "interface/responseObject.js";

export default {
  register: async (req: Request, res: Response): Promise<object> => {
    try {
      const { name, email, password, cpassword, birthday, gender } = req.body;
      if (!name || !email || !password || !cpassword || !birthday || !gender) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please Fill all Required Field!!!",
        });
      }
      if (password !== cpassword) {
        return res.status(401).json(<ResponseObject>{
          success: false,
          msg: "Password doesn't match",
        });
      }
      const emailExist = await userDetail.findOne(
        { email: email },
        { name: 1, userID: 1, email: 1 }
      );
      if (emailExist) {
        return res
          .status(409)
          .json(<ResponseObject>{ success: false, msg: "Email already Exist" });
      }
      const id = crypto.randomBytes(16).toString("hex");
      const creatingNewUserData = new userDetail({
        id,
        name,
        email,
        password,
        cpassword,
        birthday,
        gender,
        followersNo: 0,
        followingNo: 0,
        postNo: 0,
        friendsNo: 0,
        storiesNo: 0,
      });
      const saveUserRes = await creatingNewUserData.save();
      if (!saveUserRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server Error!,Failed registerd!!!",
        });
      }
      let token: string | null;
      token = await saveUserRes.generateAuthToken();
      if (token) {
        res.cookie("AuthToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "User register successfully",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, err: "Server Error!,Failed registerd!!!" });
    }
  },
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please filled the form properly!!!",
        });
      }
      const userLogin = await userDetail.findOne(
        { email: email },
        {
          email: 1,
          password: 1,
          userID: 1,
          name: 1,
          tokens: 1,
        }
      );
      if (!userLogin) {
        return res.status(404).json(<ResponseObject>{
          success: false,
          msg: "Error Login! User does't exist",
        });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          userLogin.password
        );
        if (!isPasswordMatch) {
          res.status(403).json(<ResponseObject>{
            success: false,
            msg: "Email and password doesn't match",
          });
        } else {
          let token: string | null = await userLogin.generateAuthToken();
          if (token) {
            res.cookie("AuthToken", token, {
              expires: new Date(Date.now() + 25892000000),
              httpOnly: true,
            });
          }
          res
            .status(200)
            .json(<ResponseObject>{ success: true, msg: "Login Successfully" });
        }
      }
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again letter",
      });
    }
  },
  logOut: (req: Request, res: Response) => {
    try {
      res.clearCookie("AuthToken", {
        path: "/",
      });
      return res
        .status(200)
        .json(<ResponseObject>{ success: true, msg: "User LogOut" });
    } catch (err) {
      console.log(err);
    }
  },
};
