import { instance as axios } from "../../axios";

export default {
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
