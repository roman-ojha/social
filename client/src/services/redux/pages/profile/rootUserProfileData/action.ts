import {
  RootUserProfileDataAction,
  RootUserProfileDataActionTypes,
  RootUserProfileDataState,
} from "./types";
import { Dispatch } from "react";

export const setRootUserProfileDataState = (data: RootUserProfileDataState) => {
  return (dispatch: Dispatch<RootUserProfileDataAction>) => {
    dispatch({
      type: RootUserProfileDataActionTypes.SET_ROOT_USER_PROFILE_DATA_STATE,
      payload: data,
    });
  };
};
