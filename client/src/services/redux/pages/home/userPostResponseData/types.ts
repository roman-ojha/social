export interface UserPostResponseDataState {}

export enum UserProfilePostActionTypes {
  USER_POST_RESPONSE_DATA = "UserPostResponseData",
}

export interface SetUserPostResponseDataAction {
  type: UserProfilePostActionTypes.USER_POST_RESPONSE_DATA;
  payload: UserPostResponseDataState;
}

export type UserPostResponseAction = SetUserPostResponseDataAction;
