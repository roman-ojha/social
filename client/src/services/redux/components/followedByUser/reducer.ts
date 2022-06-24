import {
  FollowedByState,
  FollowedByActionTypes,
  FollowedByAction,
} from "./types";
const initialState: FollowedByState[] = [];

const followedByUserReducer = (
  state: FollowedByState[] = initialState,
  action: FollowedByAction
) => {
  switch (action.type) {
    case FollowedByActionTypes.SET_FOLLOWED_BY_USER:
      const newList = action.payload.map((element) => {
        return {
          ...element,
          followed: false,
        };
      });
      return newList.sort((a, b) => {
        if (a.type !== "bot" || b.type !== "bot") {
          return;
        } else {
          return Math.random() - 0.5;
        }
      });
    case FollowedByActionTypes.SET_IS_FOLLOWED_FOLLOWED_BY_USER:
      return state.map((user) =>
        user.userID === action.payload.userID
          ? { ...user, followed: action.payload.followed }
          : user
      );
    default:
      return state;
  }
};

export default followedByUserReducer;
