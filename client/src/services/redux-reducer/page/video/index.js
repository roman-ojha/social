import constant from "../../../../constant/videoPage";
const initialState = constant.homePageVideos;

const videoPageDataReducer = (state = initialState, action) => {
  if (action.type === "setVideoPageData") {
    return action.payload;
  }
  return state;
};

export default videoPageDataReducer;
