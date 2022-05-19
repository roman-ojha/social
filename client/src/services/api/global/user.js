import { instance as axios } from "../../axios";

export default {
  getFriends: async (id) => {
    return await axios({
      method: "GET",
      url: `/u/getFriends/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  getFollowings: async (id) => {
    return await axios({
      method: "GET",
      url: `/u/getFollowings/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  getFollowers: async (id) => {
    return await axios({
      method: "GET",
      url: `/u/getFollowers/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
};
