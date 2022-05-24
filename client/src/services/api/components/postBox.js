import { instance as axios } from "../../axios";

export default {
  like: async (data) => {
    return await axios({
      method: "POST",
      url: "/post/like",
      data: data,
      withCredentials: true,
    });
  },
  comment: async (data) => {
    return await axios({
      url: "/post/comment",
      method: "POST",
      data: data,
      withCredentials: true,
    });
  },
  getComment: async (data) => {
    return await axios({
      url: "/get/comment",
      method: "POST",
      data: data,
      withCredentials: true,
    });
  },
};
