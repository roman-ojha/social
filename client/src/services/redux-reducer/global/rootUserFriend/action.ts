import { RootUserFriendsAction, RootUserFriendsActionTypes } from "./types";
import { Dispatch } from "react";

export const setRootUserFriends = (friends: any) => {
  return (dispatch: Dispatch<RootUserFriendsAction>) => {
    dispatch({
      type: RootUserFriendsActionTypes.SET_ROOT_USER_FRIENDS,
      payload: friends,
    });
  };
};
