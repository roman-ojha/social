import express from "express";
import youtubeAPI from "../services/api/youtubeAPI.js";
const youtubeRoute = express.Router();

// http://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&part=snippet&q=foo

//'search' part could be video, playlist, channel
// 'type': what we want in this case we want to access video
// 'part': here we can give the title and description of the video, channel
// 'q' : query

// to fetch data we will use 'axios'

youtubeRoute.get("/youtube/search", async (req, res) => {
  const response = await youtubeAPI.search("");
  const data = await response.data;
  res.json(data);
});

export default youtubeRoute;
