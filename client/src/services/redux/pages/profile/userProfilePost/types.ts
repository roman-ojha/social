export interface UserProfilePostState {
  date: Date;
}

export enum UserProfilePostActionTypes {
  SET_USER_PROFILE_POST = "userProfilePost",
}

export interface SetUserProfilePostAction {
  type: UserProfilePostActionTypes.SET_USER_PROFILE_POST;
  payload: UserProfilePostState[];
}

export type UserProfilePostAction = SetUserProfilePostAction;
