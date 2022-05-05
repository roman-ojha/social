import { instance as axios } from "../axios.js";
const API_KEY: string | undefined = process.env.YOUTUBE_BASE_API_KEY;
const API_BASE_URL: string | undefined = process.env.YOUTUBE_API_URL;

export default {
  search: async (searchQuery: string) => {
    console.log(searchQuery);
    const url = `${API_BASE_URL}/search?key=${API_KEY}&type=video&part=snippet&q=${searchQuery}`;
    console.log(url);
    return await axios({
      method: "GET",
      url: url,
    });
  },
};
