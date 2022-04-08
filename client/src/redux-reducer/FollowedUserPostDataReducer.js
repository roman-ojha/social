const initialState = [];

const setFollowedUserPostDataReducer = (state = initialState, action) => {
  if (action.type === "followedUserPostData") {
    return action.payload;
  } else if (action.type === "incrementPostCommentNumber") {
    state
      .find((user) => user.userID === action.payload.to)
      .posts.find((post) => post.id === action.payload.postID).comments.No++;
    // here we are incrementing comment number by finding the specific post
    return state;
  } else {
    return state;
  }
};

export default setFollowedUserPostDataReducer;
