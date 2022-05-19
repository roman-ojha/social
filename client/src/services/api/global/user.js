import { instance as axios } from "../../axios";

export default {
  getRootUserFriends: async (id) => {
    return await axios({
      method: "GET",
      url: `/u/getFriends/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
};
