import {
  ProfilePageAction,
  ProfilePageDataActionTypes,
  ProfilePageDataState,
} from "./types";
import { Dispatch } from "react";

export const profilePageDataAction = (data: ProfilePageDataState) => {
  return (dispatch: Dispatch<ProfilePageAction>) => {
    dispatch({
      type: ProfilePageDataActionTypes.PROFILE_PAGE_DATA_ACTION,
      payload: data,
    });
  };
};

export const setProfilePageFriends = (
  data: ProfilePageDataState["friends"]
) => {
  return (dispatch: Dispatch<ProfilePageAction>) => {
    dispatch({
      type: ProfilePageDataActionTypes.SET_PROFILE_PAGE_FRIENDS,
      payload: data,
    });
  };
};

export const setProfilePageFollowers = (
  data: ProfilePageDataState["followers"]
) => {
  return (dispatch: Dispatch<ProfilePageAction>) => {
    dispatch({
      type: ProfilePageDataActionTypes.SET_PROFILE_PAGE_FOLLOWERS,
      payload: data,
    });
  };
};

export const setProfilePageFollowings = (
  data: ProfilePageDataState["followings"]
) => {
  return (dispatch: Dispatch<ProfilePageAction>) => {
    dispatch({
      type: ProfilePageDataActionTypes.SET_PROFILE_PAGE_FOLLOWINGS,
      payload: data,
    });
  };
};
