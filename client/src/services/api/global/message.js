import { instance as axios } from "../../axios";

export default {
  getUserMessages: async () => {
    return await axios({
      method: "GET",
      url: "/u/getRootUserMessages",
      withCredentials: true,
    });
  },
};
