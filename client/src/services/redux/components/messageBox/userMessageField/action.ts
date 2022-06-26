import {
  UserMessageFieldAction,
  UserMessageFieldActionTypes,
  UserMessageFieldState,
} from "./types";
import { Dispatch } from "react";

export const userMessageFieldAction = (data: UserMessageFieldState) => {
  return (dispatch: Dispatch<UserMessageFieldAction>) => {
    dispatch({
      type: UserMessageFieldActionTypes.USER_MESSAGE_FIELD,
      payload: data,
    });
  };
};
