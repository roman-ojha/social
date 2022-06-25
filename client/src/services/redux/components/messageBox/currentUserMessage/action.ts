import {
  CurrentUserMessageAction,
  CurrentUserMessageActionTypes,
  CurrentUserMessageState,
} from "./types";
import { Dispatch } from "react";

export const currentUserMessageAction = (data: any) => {
  return (dispatch: Dispatch<CurrentUserMessageAction>) => {
    dispatch({
      type: CurrentUserMessageActionTypes.CURRENT_USER_MESSAGE,
      payload: data,
    });
  };
};

export const appendOnCurrentInnerUserMessage = (data: any) => {
  return (dispatch: Dispatch<CurrentUserMessageAction>) => {
    dispatch({
      type: CurrentUserMessageActionTypes.APPEND_ON_CURRENT_INNER_USER_MESSAGE,
      payload: data,
    });
  };
};
