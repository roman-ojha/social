const initialState = [];

const videoPageDataReducer = (state = initialState, action) => {
  if (action.type === "setVideoPageData") {
    return action.payload;
  }
  return state;
};

export default videoPageDataReducer;
