import { instance as axios } from "../../axios";

const homeApi = {
  post: async (data) => {
    return await axios({
      method: "POST",
      url: "/u/post",
      data: data,
      withCredentials: true,
    });
  },
};

export default homeApi;
