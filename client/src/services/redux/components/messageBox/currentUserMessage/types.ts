export interface CurrentUserMessageState {
  messageToId: string;
  messageToUserId: string;
  receiverPicture: string;
  message: [];
  fetchedInnerMessage: boolean;
}

export enum CurrentUserMessageActionTypes {
  CURRENT_USER_MESSAGE = "currentUserMessage",
  APPEND_ON_CURRENT_INNER_USER_MESSAGE = "appendOnCurrentInnerUserMessage",
}

export interface CurrentUserMessage {
  type: CurrentUserMessageActionTypes.CURRENT_USER_MESSAGE;
  payload: any;
}
export interface AppendOnCurrentInnerUserMessage {
  type: CurrentUserMessageActionTypes.APPEND_ON_CURRENT_INNER_USER_MESSAGE;
  payload: any;
}

export type CurrentUserMessageAction =
  | CurrentUserMessage
  | AppendOnCurrentInnerUserMessage;
