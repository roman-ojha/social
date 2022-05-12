import { instance as axios } from "../../axios";

export default {
  post: async (data) => {
    return await axios({
      method: "POST",
      url: "/u/post",
      data: data,
      withCredentials: true,
    });
  },
};
