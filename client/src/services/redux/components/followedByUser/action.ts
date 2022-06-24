import {
  FollowedByAction,
  FollowedByActionTypes,
  FollowedByState,
} from "./types";
import { Dispatch } from "react";

export const setFollowedByUser = (data: FollowedByState[]) => {
  return (dispatch: Dispatch<FollowedByAction>) => {
    dispatch({
      type: FollowedByActionTypes.SET_FOLLOWED_BY_USER,
      payload: data,
    });
  };
};

export const setIsFollowedFollowedByUser = (data: FollowedByState) => {
  return (dispatch: Dispatch<FollowedByAction>) => {
    dispatch({
      type: FollowedByActionTypes.SET_IS_FOLLOWED_FOLLOWED_BY_USER,
      payload: data,
    });
  };
};
