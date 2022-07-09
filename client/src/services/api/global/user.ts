import { instance as axios } from "../../axios";

const userApi = {
  getFriends: async (id: string) => {
    return await axios({
      method: "GET",
      url: `/u/getFriends/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  getFollowings: async (id: string) => {
    return await axios({
      method: "GET",
      url: `/u/getFollowings/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  getFollowers: async (id: string) => {
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

export default userApi;
