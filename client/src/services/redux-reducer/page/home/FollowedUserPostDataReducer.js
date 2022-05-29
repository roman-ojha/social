const initialState = [];

const setFollowedUserPostDataReducer = (state = initialState, action) => {
  if (action.type === "followedUserPostData") {
    return action.payload.sort((a, b) => Math.random() - 0.5);
  } else if (action.type === "incrementPostCommentNumber") {
    return state.map((user) =>
      user.userID === action.payload.to
        ? {
            ...user,
            posts: user.posts.map((post) =>
              post.id === action.payload.postID
                ? {
                    ...post,
                    comments: {
                      ...post.comments,
                      No: post.comments.No + 1,
                    },
                  }
                : post
            ),
          }
        : user
    );
  } else {
    return state;
  }
};

export default setFollowedUserPostDataReducer;
