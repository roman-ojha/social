import { instance as axios } from "../../axios";

const messageApi = {
  getUserMessages: async () => {
    return await axios({
      method: "GET",
      url: "/u/getRootUserMessages",
      withCredentials: true,
    });
  },
};

export default messageApi;
