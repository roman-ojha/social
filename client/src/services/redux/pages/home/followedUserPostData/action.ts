import {
  FollowedUserPostDataAction,
  FollowedUserPostDataActionTypes,
} from "./types";
import { Dispatch } from "react";

export const followedUserPostDataAction = (data: any) => {
  return (dispatch: Dispatch<FollowedUserPostDataAction>) => {
    dispatch({
      type: FollowedUserPostDataActionTypes.SET_FOLLOWED_USER_POST_DATA,
      payload: data,
    });
  };
};

export const incrementPostCommentNumber = (data: any) => {
  return (dispatch: Dispatch<FollowedUserPostDataAction>) => {
    dispatch({
      type: FollowedUserPostDataActionTypes.INCREMENT_POST_COMMENT_NUMBER,
      payload: data,
    });
  };
};
