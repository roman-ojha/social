import { instance as axios } from "../../axios";

const profileApi = {
  getUserPosts: async () => {
    return await axios({
      method: "GET",
      url: "/get/posts",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
};

export default profileApi;
