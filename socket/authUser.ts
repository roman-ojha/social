import UserDetail from "../models/userDetail_model.js";
import jwt from "jsonwebtoken";
import ExtendJWTPayload from "../types/jsonwebtoken/extend-jwt-payload.js";
import ResponseObject from "../interface/responseObject.js";
import RedisUserDetail from "../interface/redisUserDetail.js";
import {
  isRedisConnected,
  redisClient,
} from "../middleware/auth/authUsingRedis.js";

const ioAuthenticate = async (token: string) => {
  try {
    if (!token) {
      return {
        success: false,
        msg: "UnAuthorized: no token provided, please login first",
      };
    }
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as ExtendJWTPayload;
    if (isRedisConnected) {
      if (!verifyToken.id) {
        return {
          success: false,
          msg: "UnAuthorized: no a valid token, please login first",
        };
      }
      const userFromRedis = await redisClient.get(verifyToken.id);
      if (userFromRedis === null) {
        const getUserFromMongo = await UserDetail.findOne(
          {
            id: verifyToken.id,
            "tokens.token": token,
          },
          {
            userID: 1,
            name: 1,
            id: 1,
            email: 1,
            tokens: { $slice: -5 },
            _id: 0,
          }
        );
        if (!getUserFromMongo) {
          return {
            success: false,
            msg: "User not found, sorry not a valid token",
          };
        }
        // Store into redis if user is not available in redis
        const redisUserDetail: RedisUserDetail = {
          id: getUserFromMongo.id,
          email: getUserFromMongo.email,
          name: getUserFromMongo.name,
          tokens: getUserFromMongo.tokens,
          userID: getUserFromMongo.userID,
        };
        await redisClient.setEx(
          getUserFromMongo.id,
          864000,
          // for 10 days
          JSON.stringify(redisUserDetail)
        );
        return {
          success: true,
          msg: "Authenticated",
          senderId: verifyToken.id,
        };
      }
      // User Exist in Redis
      const parsedUserDetail: RedisUserDetail = JSON.parse(userFromRedis);
      const isTokenExist = parsedUserDetail.tokens.find((obj) => {
        if (obj.token === token) return true;
      });
      if (!isTokenExist) {
        return {
          success: false,
          msg: "Session is expired please login in again",
        };
      }
      // check whether user change userID/name it does then have to change those things inside redis as well
      return {
        success: true,
        msg: "Authenticated",
        senderId: verifyToken.id,
      };
    } else {
      // redis is not connected then we have to authenticate using mongodb
      const rootUser = await UserDetail.findOne(
        {
          id: verifyToken.id,
          "tokens.token": token,
        },
        // filtering to get only data that is need when page load
        {
          userID: 1,
          name: 1,
          id: 1,
          email: 1,
          _id: 0,
        }
      );
      if (!rootUser) {
        return {
          success: false,
          msg: "User not found, sorry not a valid token",
        };
      }
      return {
        success: true,
        msg: "Authenticated",
        senderId: verifyToken.id,
      };
    }
  } catch (err) {
    return {
      success: false,
      msg: "Server Error!!, Please Try again later",
    };
  }
};

export default ioAuthenticate;
