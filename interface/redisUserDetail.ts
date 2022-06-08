type RedisUserDetail = {
  id: string;
  name: string;
  email: string;
  userID: string;
  tokens: {
    token: string;
  }[];
};

export default RedisUserDetail;
