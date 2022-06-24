export interface VideoPageState {
  videoId: string;
  title: string;
  thumbnail: string;
}

export enum VideoPageActionTypes {
  SET_VIDEO_PAGE_DATA = "setVideoPageData",
}
export interface SetVideoPageDataAction {
  type: VideoPageActionTypes.SET_VIDEO_PAGE_DATA;
  payload: VideoPageState[];
}

export type VideoPageAction = SetVideoPageDataAction;
