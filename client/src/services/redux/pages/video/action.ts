import { VideoPageAction, VideoPageActionTypes, VideoPageState } from "./types";
import { Dispatch } from "react";

export const setVideoPageData = (data: VideoPageState) => {
  return (dispatch: Dispatch<VideoPageAction>) => {
    dispatch({
      type: VideoPageActionTypes.SET_VIDEO_PAGE_DATA,
      payload: data,
    });
  };
};
