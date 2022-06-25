import {
  MessageListState,
  MessageListAction,
  MessageListActionTypes,
  ResponseMessage,
} from "./types";
import { Dispatch } from "react";

export const messageListAction = (data: MessageListState[]) => {
  return (dispatch: Dispatch<MessageListAction>) => {
    dispatch({
      type: MessageListActionTypes.MESSAGE_LIST,
      payload: data,
    });
  };
};

export const appendMessageOnMessageListAction = (data: ResponseMessage) => {
  return (dispatch: Dispatch<MessageListAction>) => {
    dispatch({
      type: MessageListActionTypes.APPEND_MESSAGE_ON_MESSAGE_LIST,
      payload: data,
    });
  };
};
