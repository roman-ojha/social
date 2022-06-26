import UserDocument from "../../../../interface/userDocument";

export interface RootUserProfileDetailState extends UserDocument {
  fetchedPostData: boolean;
}

export enum RootUserProfileDetailActionTypes {
  USER_PROFILE_DETAIL = "userProfileDetail",
  CHANGE_USER_PROFILE_PICTURE = "changeUserProfilePicture",
  CHANGE_ROOT_USER_USER_ID = "changeRootUserUserID",
  CHANGE_ROOT_USERNAME = "changeRootUserName",
  SET_ROOT_USER_POST_DATA = "setRootUserPostData",
}
export interface SetRootUserProfileDetailAction {
  type: RootUserProfileDetailActionTypes.USER_PROFILE_DETAIL;
  payload: any;
}

export interface ChangeRootUserProfilePicture {
  type: RootUserProfileDetailActionTypes.CHANGE_USER_PROFILE_PICTURE;
  payload: any;
}

export interface ChangeRootUserUserID {
  type: RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_USER_ID;
  payload: any;
}

export interface ChangeRootUserName {
  type: RootUserProfileDetailActionTypes.CHANGE_ROOT_USERNAME;
  payload: any;
}

export interface setRootUserPostData {
  type: RootUserProfileDetailActionTypes.SET_ROOT_USER_POST_DATA;
  payload: any;
}

export type RootUserProfileDetailAction =
  | SetRootUserProfileDetailAction
  | ChangeRootUserProfilePicture
  | ChangeRootUserUserID
  | ChangeRootUserName
  | setRootUserPostData;
