import {
  RootUserProfileDetailActionTypes,
  RootUserProfileDetailAction,
  RootUserProfileDetailState,
} from "./types";
import { Dispatch } from "redux";

export const userProfileDetailAction = (detail: RootUserProfileDetailState) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.USER_PROFILE_DETAIL,
      payload: detail,
    });
  };
};

export const changeUserProfilePictureAction = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.CHANGE_USER_PROFILE_PICTURE,
      payload: detail,
    });
  };
};

export const changeRootUserUserIDAction = (detail: any) => {
  return (dispatch: Dispatch<RootUserProfileDetailAction>) => {
    dispatch({
      type: RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_USER_ID,
      payload: detail,
    });
  };
};

export const changeRootUserNameAction = (detail: any) => {
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
