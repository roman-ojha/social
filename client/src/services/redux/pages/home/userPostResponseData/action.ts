import {
  UserPostResponseAction,
  UserPostResponseDataState,
  UserProfilePostActionTypes,
} from "./types";
import { Dispatch } from "react";

export const userPostResponseData = (data: UserPostResponseDataState) => {
  return (dispatch: Dispatch<UserPostResponseAction>) => {
    dispatch({
      type: UserProfilePostActionTypes.USER_POST_RESPONSE_DATA,
      payload: data,
    });
  };
};
