import {
  CommentBoxAction,
  CommentBoxActionTypes,
  CommentBoxState,
} from "./types";
import { Dispatch } from "react";

export const setCommentBoxData = (data: CommentBoxState) => {
  return (dispatch: Dispatch<CommentBoxAction>) => {
    dispatch({
      type: CommentBoxActionTypes.COMMENT_BOX,
      payload: data,
    });
  };
};
