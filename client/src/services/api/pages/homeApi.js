import { instance as axios } from "../../axios";

const homeApi = {
  postFile: async (data) => {
    return await axios({
      method: "POST",
      url: "/u/post-image-file",
      data: data,
      withCredentials: true,
    });
  },
  postImageUrl: async (data) => {
    return await axios({
      method: "POST",
      url: "/post/image-url",
      data: data,
      withCredentials: true,
    });
  },
};

export default homeApi;
