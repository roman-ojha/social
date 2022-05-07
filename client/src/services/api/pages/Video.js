import { instance as axios } from "../../axios";

export default {
  getVideos: async () => {
    return await axios({
      method: "GET",
      url: "/scrap/youtube/home",
      withCredentials: true,
    });
  },
  searchVideo: async (query) => {
    return await axios({
      method: "GET",
      url: `/scrap/youtube/search?query=${query}`,
      withCredentials: true,
    });
  },
};
