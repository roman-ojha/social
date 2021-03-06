// import constant from "../../../../constant/videoPage";
// const initialState = constant.homePageVideos.sort(() => Math.random() - 0.5);
import { VideoPageAction, VideoPageActionTypes, VideoPageState } from "./types";
const initialState: VideoPageState = {
  fetchedVideos: false,
  searchedVideos: false,
  videos: [],
};

const videoPageDataReducer = (
  state: VideoPageState = initialState,
  action: VideoPageAction
): VideoPageState => {
  switch (action.type) {
    case VideoPageActionTypes.SET_VIDEO_PAGE_DATA:
      return {
        fetchedVideos: action.payload.fetchedVideos,
        searchedVideos: action.payload.searchedVideos,
        videos: action.payload.videos.sort(() => Math.random() - 0.5),
      };
    default:
      return state;
  }
};

export default videoPageDataReducer;
