import {
  RootUserFriendsAction,
  RootUserFriendsActionTypes,
  RootUserFriendsState,
} from "./types";
import { Dispatch } from "react";

export const setRootUserFriends = (friends: RootUserFriendsState) => {
  return (dispatch: Dispatch<RootUserFriendsAction>) => {
    dispatch({
      type: RootUserFriendsActionTypes.SET_ROOT_USER_FRIENDS,
      payload: friends,
    });
  };
};
