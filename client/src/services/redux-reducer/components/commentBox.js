const initialState = {
  openCommentBox: false,
  postID: "",
  to: "",
  comments: [],
};

const commentBoxReducer = (state = initialState, action) => {
  if (action.type === "commentBox") {
    return action.payload;
  } else {
    return state;
  }
};

export default commentBoxReducer;
