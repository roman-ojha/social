import {
  isRedisConnected,
  redisClient,
} from "../middleware/auth/authUsingRedis.js";
import RedisUserDetail from "../interface/redisUserDetail.js";
import UserDetail from "../models/userDetail_model.js";

type WhatToChangeType = "name" | "userID";

const updateRedisUser = async (
  id: string,
  whatToChange: WhatToChangeType,
  newData: string
): Promise<boolean> => {
  try {
    const user = await UserDetail.findOne(
      {
        id,
      },
      {
        email: 1,
        password: 1,
        userID: 1,
        name: 1,
        tokens: { $slice: -5 },
        id: 1,
      }
    );
    if (!user) {
      return false;
    }
    if (!isRedisConnected) {
      return false;
    }
    const redisUserDetail: RedisUserDetail = {
      id: user.id,
      email: user.email,
      name: whatToChange === "name" ? newData : user.name,
      userID: whatToChange === "userID" ? newData : user.userID,
      tokens: user.tokens,
    };
    await redisClient.setEx(
      user.id,
      864000,
      // for 10 days
      JSON.stringify(redisUserDetail)
    );
    return true;
  } catch (err) {
    return false;
  }
};

export default updateRedisUser;
