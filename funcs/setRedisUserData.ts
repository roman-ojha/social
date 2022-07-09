import {
  isRedisConnected,
  redisClient,
} from "../middleware/auth/authUsingRedis.js";
import RedisUserDetail from "../interface/redisUserDetail.js";

type ArgumentObj = RedisUserDetail;

const setRedisUserData = async (userDetail: ArgumentObj) => {
  try {
    if (isRedisConnected) {
      let redisUserDetail: RedisUserDetail;
      if (userDetail.userID === undefined) {
        redisUserDetail = {
          id: userDetail.id,
          email: userDetail.email,
          name: userDetail.name,
          tokens: userDetail.tokens,
        };
      } else {
        redisUserDetail = {
          id: userDetail.id,
          email: userDetail.email,
          name: userDetail.name,
          tokens: userDetail.tokens,
          userID: userDetail.userID,
        };
      }
      await redisClient.setEx(
        redisUserDetail.id,
        864000,
        // for 10 days
        JSON.stringify(redisUserDetail)
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default setRedisUserData;
