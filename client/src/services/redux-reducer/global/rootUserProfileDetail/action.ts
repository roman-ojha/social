import {
  RootUserProfileDetailActionTypes,
  RootUserProfileDetailAction,
} from "./types";
import { Dispatch } from "redux";

export const setRootUserProfileDetail = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.SET_ROOT_USER_PROFILE_DETAIL,
      payload: detail,
    });
  };
};

export const changeRootUserProfilePicture = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_PROFILE_PICTURE,
      payload: detail,
    });
  };
};

export const changeRootUserUserID = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_USER_ID,
      payload: detail,
    });
  };
};

export const changeRootUserName = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.CHANGE_ROOT_USERNAME,
      payload: detail,
    });
  };
};

export const setRootUserPostData = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.SET_ROOT_USER_POST_DATA,
      payload: detail,
    });
  };
};
