import { instance as axios } from "../../axios";

const index = {
  getFriendData: async (userID: string) => {
    return await axios({
      method: "GET",
      url: `/u/profile/${userID}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
};

export default index;
