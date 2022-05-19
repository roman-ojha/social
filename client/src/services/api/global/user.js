import { instance as axios } from "../../axios";

export default {
  getRootUserFriends: async (data) => {
    return await axios({
      method: "GET",
      url: `/u/getFriends`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      withCredentials: true,
    });
  },
};
