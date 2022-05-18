import express from "express";
const youtubeRoute = express.Router();
import youtubeController from "../controllers/youtube.controller.js";

// http://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&part=snippet&q=foo

//'search' part could be video, playlist, channel
// 'type': what we want in this case we want to access video
// 'part': here we can give the title and description of the video, channel
// 'q' : query

// to fetch data we will use 'axios'

// Without using 'googleapis' package

// youtubeRoute.get("/youtube/videos", youtubeController.youtubeVideo);
youtubeRoute.get("/youtube/search", youtubeController.searchYoutubeVideo);

// NOTE: you can also use 'googleapis' to do the same task that we did in here

export default youtubeRoute;
