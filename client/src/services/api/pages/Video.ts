import { instance as axios } from "../../axios";

const videoApi = {
  scrapeVideo: async () => {
    return await axios({
      method: "GET",
      url: "/scrap/youtube/home",
      withCredentials: true,
    });
  },
  scrapVideoSearch: async (query: string) => {
    return await axios({
      method: "GET",
      url: `/scrap/youtube/search?q=${query}`,
      withCredentials: true,
    });
  },
  getYoutubeApi: async () => {
    return await axios({
      method: "GET",
      url: "/youtube/videos",
      withCredentials: true,
    });
  },
  searchYoutubeVideo: async (query: string) => {
    return await axios({
      method: "GET",
      url: `/youtube/search?q=${query}`,
      withCredentials: true,
    });
  },
  getYoutubeHomePageVideos: async () => {
    return await axios({
      method: "GET",
      url: `/youtube/home`,
      withCredentials: true,
    });
  },
};

export default videoApi;
