const initialState = [];

const setFollowedUserPostDataReducer = (state = initialState, action) => {
  if (action.type === "followedUserPostData") {
    console.log(action.payload);
    return action.payload;
  } else if (action.type === "incrementPostCommentNumber") {
    // state;
    // .find((user) => user.userID === action.payload.to)
    // .posts.find((post) => post.id === action.payload.postID).comments.No++;
    // here we are incrementing comment number by finding the specific post
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
