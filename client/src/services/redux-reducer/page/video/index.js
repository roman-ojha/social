// import constant from "../../../../constant/videoPage";
// const initialState = constant.homePageVideos.sort(() => Math.random() - 0.5);
const initialState = [];

const videoPageDataReducer = (state = initialState, action) => {
  if (action.type === "setVideoPageData") {
    return action.payload.sort(() => Math.random() - 0.5);
  }
  return state;
};

export default videoPageDataReducer;
