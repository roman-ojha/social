import UserDetail from "../../models/userDetail_model.js";
import redis, { RedisClientType } from "redis";
import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ExtendJWTPayload from "../../types/jsonwebtoken/extend-jwt-payload.js";
import ResponseObject from "../../interface/responseObject.js";

const REDIS_PORT = process.env.REDIS_PORT || 6379;
let isRedisConnected: boolean = false;

const redisClient = redis.createClient({
  socket: { port: REDIS_PORT as number, host: "localhost" },
});

const connectRedis = async (): Promise<boolean> => {
  try {
    await redisClient.connect();
    console.log("Redis Connection Successful");
    isRedisConnected = true;
    return true;
  } catch (err) {
    console.log("Err: Can't be able to connect with redis");
    isRedisConnected = false;
    return false;
  }
};

const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as ExtendJWTPayload;
    console.log(isRedisConnected);
    const userFromRedis = await redisClient.get(verifyToken.id);
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if (userFromRedis === null) {
      //   next();
      const getUser = await UserDetail.findOne(
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
      if (!getUser) {
        return res.status(401).send(<ResponseObject>{
          success: false,
          msg: "User not found, sorry not a valid token",
        });
      }
      req.token = token;
      req.rootUser = getUser;
      req.userID = getUser.userID;
      next();
      return;
    }
    // console.log(JSON.parse(userFromRedis));
    next();
  } catch (err) {}
};

export default authenticate;
export { redisClient, connectRedis };
