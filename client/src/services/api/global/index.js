import { instance as axios } from "../../axios";

export default {
  getFriendData: async (userID) => {
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
