import youtubeAPI from "../services/api/youtubeAPI.js";
import ResponseObject from "interface/responseObject.js";
import { AxiosResponse } from "axios";
import YoutubeQueryTopic from "../constants/youtube_Query_Topic.js";
import { Request, Response } from "express";

interface YoutubeResponseType {
  items: object[];
}
export default {
  youtubeVideo: async (req: Request, res: Response): Promise<object> => {
    let requiredList: object[] = [];
    let maxResults: number;
    let randomNum: number;
    try {
      for (let i = 1; i < 4; i++) {
        let response: AxiosResponse<any, any>;
        maxResults = 5 * i;
        if (i === 1) {
          randomNum = Math.floor(
            Math.random() * YoutubeQueryTopic.lowPriorityVideoQuery.length
          );
          response = await youtubeAPI.search(
            YoutubeQueryTopic.hightPriorityVideoQuery[randomNum],
            maxResults
          );
        } else if (i === 2) {
          randomNum = Math.floor(
            Math.random() * YoutubeQueryTopic.mediumPriorityVideoQuery.length
          );

          response = await youtubeAPI.search(
            YoutubeQueryTopic.mediumPriorityVideoQuery[randomNum],
            maxResults
          );
        } else if (i === 3) {
          randomNum = Math.floor(
            Math.random() * YoutubeQueryTopic.hightPriorityVideoQuery.length
          );
          response = await youtubeAPI.search(
            YoutubeQueryTopic.lowPriorityVideoQuery[randomNum],
            maxResults
          );
        } else {
          randomNum = Math.floor(
            Math.random() * YoutubeQueryTopic.hightPriorityVideoQuery.length
          );
          response = await youtubeAPI.search(
            YoutubeQueryTopic.hightPriorityVideoQuery[randomNum],
            maxResults
          );
        }
        const responseData: YoutubeResponseType = await response.data;
        requiredList.push(responseData.items);
      }
      return res
        .status(200)
        .json(<ResponseObject>{ success: true, msg: "", videos: requiredList });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error Please Try again later",
      });
    }
  },
};
