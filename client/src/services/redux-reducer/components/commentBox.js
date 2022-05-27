const initialState = {
  openCommentBox: false,
  postID: "",
  toId: "",
  toUserId: "",
  commented: false,
  newComment: "",
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
