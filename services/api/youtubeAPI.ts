/* eslint-disable import/no-unresolved */
// import { google } from "googleapis";
import { instance as axios } from "../axios.js";

const API_KEY: string | undefined = process.env.YOUTUBE_BASE_API_KEY;

// const youtube = google.youtube({
//   version: "v3",
//   auth: API_KEY
// });

const API_BASE_URL: string | undefined = process.env.YOUTUBE_API_URL;
export default {
  search: async (searchQuery: string, maxResults: Number) => {
    const url = `${API_BASE_URL}/search?key=${API_KEY}&type=video&part=snippet&q=${searchQuery}&maxResults=${maxResults}`;
    // eslint-disable-next-line no-return-await
    return await axios({
      method: "GET",
      url
    });
  }
};
