const initialState = false;

const openCommentBoxReducer = (state = initialState, action) => {
  if (action.type === "openCommentBox") {
    return action.payload;
  } else {
    return state;
  }
};

export default openCommentBoxReducer;
