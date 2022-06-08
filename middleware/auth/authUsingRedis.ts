import UserDetail from "../../models/userDetail_model.js";
import redis, { RedisClientType } from "redis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  socket: { port: REDIS_PORT as number },
});

const connectRedis = async () => {
  await redisClient
    .connect()
    .then(() => {
      console.log("Redis Connection Successful");
      return true;
    })
    .catch((err) => {
      console.log("Err: Can't be able to connect with redis");
      return false;
    });
};
