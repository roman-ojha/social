export type UserMessageFieldState = string;

export enum UserMessageFieldActionTypes {
  USER_MESSAGE_FIELD = "userMessageField",
}
export interface UserMessageField {
  type: UserMessageFieldActionTypes.USER_MESSAGE_FIELD;
  payload: UserMessageFieldState;
}

export type UserMessageFieldAction = UserMessageField;
