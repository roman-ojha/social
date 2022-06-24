export interface RootUserProfileDetailState {
  fetchedPostData: boolean;
}

export enum RootUserProfileDetailActionTypes {
  SET_ROOT_USER_PROFILE_DETAIL = "setRootUserProfileDetail",
  CHANGE_ROOT_USER_PROFILE_PICTURE = "changeRootUserProfilePicture",
  CHANGE_ROOT_USER_USER_ID = "changeRootUserUserID",
  CHANGE_ROOT_USERNAME = "changeRootUserName",
  CHANGE_ROOT_USER_POST_DATA = "setRootUserPostData",
}
