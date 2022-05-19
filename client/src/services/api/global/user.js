import { instance as axios } from "../../axios";

export default {
  getRootUserFriends: async () => {
    return await axios({
      method: "GET",
      url: `/u/getFriends`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
};
