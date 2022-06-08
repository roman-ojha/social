import UserDetail from "../../models/userDetail_model.js";
import redis, { RedisClientType } from "redis";
import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  socket: { port: REDIS_PORT as number, host: "localhost" },
});

const connectRedis = async (): Promise<boolean> => {
  try {
    await redisClient.connect();
    console.log("Redis Connection Successful");
    return true;
  } catch (err) {
    console.log("Err: Can't be able to connect with redis");
    return false;
  }
};

// const authenticate: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies.AuthToken;
//   const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//   console.log(verifyToken);
// };

// export default authenticate;
export { redisClient, connectRedis };
