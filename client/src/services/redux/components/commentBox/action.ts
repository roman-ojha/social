import {
  CommentBoxAction,
  CommentBoxActionTypes,
  CommentBoxState,
} from "./types";
import { Dispatch } from "react";

export const setCommentBoxData = (data: CommentBoxState) => {
  return (dispatch: Dispatch<CommentBoxAction>) => {
    dispatch({
      type: CommentBoxActionTypes.SET_COMMENT_BOX_DATA,
      payload: data,
    });
  };
};
