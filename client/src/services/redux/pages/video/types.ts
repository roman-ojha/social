import { YoutubeVideos } from "../../../../interface/youtubeVideos";

export interface VideoPageState extends YoutubeVideos {}

export enum VideoPageActionTypes {
  SET_VIDEO_PAGE_DATA = "setVideoPageData",
}
export interface SetVideoPageDataAction {
  type: VideoPageActionTypes.SET_VIDEO_PAGE_DATA;
  payload: VideoPageState[];
}

export type VideoPageAction = SetVideoPageDataAction;
