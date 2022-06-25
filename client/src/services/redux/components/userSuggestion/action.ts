import { UserSuggestionAction, UserSuggestionActionTypes } from "./types";
import { Dispatch } from "react";

export const userSuggestionAction = (data: any) => {
  return (dispatch: Dispatch<UserSuggestionAction>) => {
    dispatch({
      type: UserSuggestionActionTypes.USER_SUGGESTION,
      payload: data,
    });
  };
};

export const isFollowedSuggestedUser = (data: any) => {
  return (dispatch: Dispatch<UserSuggestionAction>) => {
    dispatch({
      type: UserSuggestionActionTypes.IS_FOLLOWED_SUGGESTED_USER,
      payload: data,
    });
  };
};
