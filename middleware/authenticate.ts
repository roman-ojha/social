import jwt from "jsonwebtoken";
import userDetail from "../models/userDetail_model.js";
import { RequestHandler } from "express";
import ExtendJWTPayload from "types/jsonwebtoken/extend-jwt-payload.js";

const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as ExtendJWTPayload;
    const rootUser = await userDetail.findOne(
      {
        _id: verifyToken._id,
        "tokens.token": token,
      },
      // filtering to get only data that is need when page load
      {
        posts: { $slice: -5 },
        // getting newly uploaded 5 post
        password: 0,
        cpassword: 0,
        birthday: 0,
        gender: 0,
        date: 0,
        "messages.message": { $slice: -2 },
        // only getting 2 item from the array of message from single user
        tokens: 0,
      }
    );
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = <any>rootUser._id;
    // req.userID = rootUser.id;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized: No token provided");
    // console.log(err);
  }
};

export default authenticate;
