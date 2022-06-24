import {
  RootUserFriendsState,
  RootUserFriendsAction,
  RootUserFriendsActionTypes,
} from "./types";

const initialState: RootUserFriendsState = {
  fetchedFriends: false,
  friends: [],
};

const rootUserFriendsReducer = (
  state: RootUserFriendsState = initialState,
  action: RootUserFriendsAction
) => {
  switch (action.type) {
    case RootUserFriendsActionTypes.SET_ROOT_USER_FRIENDS:
      return {
        fetchedFriends: action.payload.fetchedFriends,
        friends: action.payload.friends.sort((a, b) => Math.random() - 0.5),
      };
    default:
      return state;
  }
};

export default rootUserFriendsReducer;
