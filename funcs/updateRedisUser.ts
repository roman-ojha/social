import { isRedisConnected } from "../middleware/auth/authUsingRedis.js";
import RedisUserDetail from "../interface/redisUserDetail.js";

const updateRedisUser = (id: string) => {
  //   if (isRedisConnected) {
  //     const redisUserDetail: RedisUserDetail = {
  //       id: userLogin.id,
  //       email: userLogin.email,
  //       name: userLogin.name,
  //       tokens: userLogin.tokens,
  //       userID: userLogin.userID,
  //     };
  //     await redisClient.setEx(
  //       userLogin.id,
  //       864000,
  //       // for 10 days
  //       JSON.stringify(redisUserDetail)
  //     );
  //   }
};

export default updateRedisUser;
