import UserDetail from "../models/userDetail_model.js";
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
import { __prod__ } from "../constants/env.js";
import setRedisUserData from "../funcs/setRedisUserData.js";
import ResponseObject from "interface/responseObject.js";
import constants from "../constants/index.js";

export default {
  loginSuccess: async (req: any, res: any) => {
    // here if user login form google after that we are finding the email of that on data base and generating token for that user and after that store that token in cookie
    // and after that we are redirecting to the homepage after that there we will check the does token get match or not if it get match then we will send the data from the user into the home page
    try {
      const userLogin = await UserDetail.findOne(
        { email: req.user.email },
        {
          email: 1,
          userID: 1,
          name: 1,
          picture: 1,
          tokens: { $slice: -5 },
          id: 1,
        }
      );
      if (userLogin) {
        const token: string | null = await userLogin.generateAuthToken();
        if (token) {
          res.cookie("AuthToken", token, {
            maxAge: 25892000000,
            httpOnly: true,
            domain: process.env.ORIGIN_HOSTNAME,
            secure: true,
            // signed: true,
            sameSite: "none",
          });
        }
        // NOTE: if we would hosted client app on vercel and server on heroku and Cookies are not cross-domain compatible. if it was, it would be a serious security issue. So that we have to pass the token as response object
        if (userLogin.userID === undefined) {
          await setRedisUserData({
            id: userLogin.id,
            email: userLogin.email,
            name: userLogin.name,
            tokens: userLogin.tokens,
          });
          return res.redirect(`${CLIENT_BASE_URL}/userid?uid=undefined`);
        } else {
          await setRedisUserData({
            id: userLogin.id,
            email: userLogin.email,
            name: userLogin.name,
            userID: userLogin.userID,
            tokens: userLogin.tokens,
          });
          return res.redirect(`${CLIENT_BASE_URL}/u/home`);
        }
      }
      return res.status(401).json(<ResponseObject>{
        success: false,
        msg: `UnAuthorized`,
      });
    } catch (err) {
      res.status(500).json(<ResponseObject>{
        success: false,
        msg: `Server Error, Please try again letter...`,
      });
    }
  },
  loginFail: (req: any, res: any) => {
    try {
      res.status(500).json(<ResponseObject>{
        success: false,
        msg: `Server Error, Please try again letter... Or Create a New ${constants.applicationName} Account`,
      });
    } catch (err) {}
  },
};
