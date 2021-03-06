import {
  UserProfilePostActionTypes,
  UserProfilePostState,
  UserProfilePostAction,
} from "./types";
import { Dispatch } from "react";

export const userProfilePostAction = (data: UserProfilePostState[]) => {
  return (dispatch: Dispatch<UserProfilePostAction>) => {
    dispatch({
      type: UserProfilePostActionTypes.SET_USER_PROFILE_POST,
      payload: data,
    });
  };
};
