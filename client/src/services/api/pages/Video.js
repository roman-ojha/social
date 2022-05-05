import { instance as axios } from "../../axios";

export default {
  getVideos: async () => {
    return await axios({
      method: "GET",
      url: "/youtube/videos",
      withCredentials: true,
    });
  },
};
