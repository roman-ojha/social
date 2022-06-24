/* eslint-disable import/no-unresolved */
import jwt from "jsonwebtoken";
// eslint-disable-next-line object-curly-newline
import { RequestHandler, Request, Response, NextFunction } from "express";
import userDetail from "../../models/userDetail_model.js";
// eslint-disable-next-line import/extensions
import ExtendJWTPayload from "../../types/jsonwebtoken/extend-jwt-payload.js";
import ResponseObject from "../../interface/responseObject.js";

// eslint-disable-next-line consistent-return
const authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY!) as ExtendJWTPayload;
    const rootUser = await userDetail.findOne(
      {
        id: verifyToken.id,
        "tokens.token": token
      },
      // filtering to get only data that is need when page load
      {
        userID: 1,
        name: 1,
        id: 1,
        email: 1,
        _id: 0
      }
    );
    if (!rootUser) {
      return res.status(401).send(<ResponseObject>{
        success: false,
        msg: "User not found, sorry not a valid token"
      });
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser.userID;
    next();
  } catch (err) {
    return res.status(401).send(<ResponseObject>{
      success: false,
      msg: "UnAuthorized: no token provided, please login first"
    });
  }
};

export default authenticate;
