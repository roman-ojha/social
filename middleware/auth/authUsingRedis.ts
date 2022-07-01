import UserDetail from "../../models/userDetail_model.js";
import redis from "redis";
import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ExtendJWTPayload from "../../types/jsonwebtoken/extend-jwt-payload.js";
import ResponseObject from "../../interface/responseObject.js";
import RedisUserDetail from "../../interface/redisUserDetail.js";

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
let isRedisConnected: boolean = false;

const redisClient = redis.createClient({
  socket: { port: REDIS_PORT as number, host: REDIS_HOST },
  password: REDIS_PASSWORD,
});

const connectRedis = () => {
  redisClient
    .connect()
    .then(() => {
      console.log("Redis Connected Successfully");
      isRedisConnected = true;
    })
    .catch(() => {
      console.log("Some error occur while connecting to redis");
    });
};

redisClient.on("error", async (err) => {
  if (isRedisConnected === true) {
    isRedisConnected = false;
  }
});

const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.AuthToken;
    if (!token) {
      return res.status(401).send(<ResponseObject>{
        success: false,
        msg: "UnAuthorized: not token provided, please login first",
      });
    }
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as ExtendJWTPayload;
    if (isRedisConnected) {
      if (!verifyToken.id) {
        return res.status(401).send(<ResponseObject>{
          success: false,
          msg: "UnAuthorized: not a valid token, please login first",
        });
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
          return res.status(401).send(<ResponseObject>{
            success: false,
            msg: "User not found, sorry not a valid token",
          });
        }
        req.token = token;
        req.rootUser = getUserFromMongo;
        req.userID = getUserFromMongo.userID;
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
        next();
        return;
      }
      // User Exist in Redis
      //   console.log(JSON.parse(userFromRedis));
      const parsedUserDetail: RedisUserDetail = JSON.parse(userFromRedis);
      const isTokenExist = parsedUserDetail.tokens.find((obj) => {
        if (obj.token === token) return true;
      });
      if (!isTokenExist) {
        return res.status(401).send(<ResponseObject>{
          success: false,
          msg: "Session is expired please login in again",
        });
      }
      // check whether user change userID/name it does then have to change those things inside redis as well
      req.token = token;
      req.rootUser = {
        ...parsedUserDetail,
        tokens: [],
      };
      req.userID = parsedUserDetail.userID;
      next();
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
        return res.status(401).send(<ResponseObject>{
          success: false,
          msg: "User not found, sorry not a valid token",
        });
      }
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser.userID;
      next();
    }
  } catch (err) {
    return res.status(500).json(<ResponseObject>{
      success: false,
      msg: "Server Error!!, Please Try again later",
    });
  }
};

export default authenticate;
export { redisClient, connectRedis, isRedisConnected };
