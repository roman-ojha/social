import {
  FollowedByAction,
  FollowedByActionTypes,
  FollowedByState,
} from "./types";
import { Dispatch } from "react";

export const followedByUserAction = (data: FollowedByState[]) => {
  return (dispatch: Dispatch<FollowedByAction>) => {
    dispatch({
      type: FollowedByActionTypes.SET_FOLLOWED_BY_USER,
      payload: data,
    });
  };
};

export const isFollowedFollowedByUser = (data: FollowedByState) => {
  return (dispatch: Dispatch<FollowedByAction>) => {
    dispatch({
      type: FollowedByActionTypes.SET_IS_FOLLOWED_FOLLOWED_BY_USER,
      payload: data,
    });
  };
};
