const initialState = [];

const videoPageDataReducer = (state = initialState, action) => {
  if (action.type === "setVideoPageData") {
    // const newVideosList = action.payload.map((videos) =>
    //   videos.map((video) => video)
    // );
    // console.log(newVideosList);
    return action.payload;
  }
  return state;
};

export default videoPageDataReducer;
