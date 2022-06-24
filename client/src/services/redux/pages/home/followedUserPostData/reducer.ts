import {
  FollowedUserPostDataAction,
  FollowedUserPostDataActionTypes,
  FollowedUserPostDataState,
} from "./types";

const initialState: FollowedUserPostDataState[] = [];

const setFollowedUserPostDataReducer = (
  state: FollowedUserPostDataState[] = initialState,
  action: FollowedUserPostDataAction
) => {
  switch (action.type) {
    case FollowedUserPostDataActionTypes.SET_FOLLOWED_USER_POST_DATA:
      return action.payload.sort((a, b) => Math.random() - 0.5);
    case FollowedUserPostDataActionTypes.INCREMENT_POST_COMMENT_NUMBER:
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
    default:
      return state;
  }
};

export default setFollowedUserPostDataReducer;
