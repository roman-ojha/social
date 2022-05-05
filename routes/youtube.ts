import express from "express";
import youtubeAPI from "../services/api/youtubeAPI.js";
import { google } from "googleapis";
import ResponseObject from "interface/responseObject.js";
import { AxiosResponse } from "axios";
const youtubeRoute = express.Router();

// http://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&part=snippet&q=foo

//'search' part could be video, playlist, channel
// 'type': what we want in this case we want to access video
// 'part': here we can give the title and description of the video, channel
// 'q' : query

// to fetch data we will use 'axios'

// Without using 'googleapis' package

const hightPriorityVideoQuery: string[] = [
  // Movie
  "hindi movie clip",
  "bollywood movie clip",
  "hollywood movie clip",
  "nepali movie",
  // Songs
  "nepali songs",
  "english songs",
  "hindi song",
];
const mediumPriorityVideoQuery: string[] = [
  // Song
  "ariana grande",
  "taylor swift",
  "eminem",
  "selena gomez",
  "jennifer lopez",
  "katy perry",
  "justin bieber",
  "charlie puth",
  "ed sheran",
  // Youtube's
  "MrBeat",
  "GadgetByte Nepali",
  "Trakin Tech",
  "Mrwhosetheboss",
  "Marques Brownlee",
  "Unbox Therapy",
  "FactTechz",
  "Bright Side",
];
const lowPriorityVideoQuery: string[] = [
  // Song
  "bollywood cover songs",
  "hindi cover songs",
  "cover songs",
  "english cover songs",
  "arijit sings",
  "atif aslam",
  "t series full video song",
];

interface YoutubeResponseType {
  items: object[];
}

youtubeRoute.get("/youtube/search", async (req, res, next) => {
  let requiredList: object[] = [];
  let maxResults: number;
  let randomNum: number;
  try {
    for (let i = 1; i < 4; i++) {
      let response: AxiosResponse<any, any>;
      maxResults = 5 * i;
      if (i === 1) {
        randomNum = Math.floor(Math.random() * lowPriorityVideoQuery.length);
        response = await youtubeAPI.search(
          hightPriorityVideoQuery[randomNum],
          maxResults
        );
      } else if (i === 2) {
        randomNum = Math.floor(Math.random() * mediumPriorityVideoQuery.length);

        response = await youtubeAPI.search(
          mediumPriorityVideoQuery[randomNum],
          maxResults
        );
      } else if (i === 3) {
        randomNum = Math.floor(Math.random() * hightPriorityVideoQuery.length);
        response = await youtubeAPI.search(
          lowPriorityVideoQuery[randomNum],
          maxResults
        );
      } else {
        randomNum = Math.floor(Math.random() * hightPriorityVideoQuery.length);
        response = await youtubeAPI.search(
          hightPriorityVideoQuery[randomNum],
          maxResults
        );
      }
      const responseData: YoutubeResponseType = await response.data;
      requiredList.push(responseData.items);
    }
    console.log(requiredList);
    return res.send("hello");
  } catch (err) {
    return res.status(500).json(<ResponseObject>{
      success: false,
      msg: "Server Error Please Try again later",
    });
  }
});

// NOTE: you can also use 'googleapis' to do the same task that we did in here

export default youtubeRoute;
