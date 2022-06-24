export interface RootUserProfileDataState {
  fetchedRootUserProfileData: boolean;
  getRootUserProfileData: boolean;
}

export enum RootUserProfileDataActionTypes {
  SET_ROOT_USER_PROFILE_DATA_STATE = "setRootUserProfileDataState",
}
export interface SetRootUserProfileDataState {
  type: RootUserProfileDataActionTypes.SET_ROOT_USER_PROFILE_DATA_STATE;
  payload: RootUserProfileDataState;
}

export type RootUserProfileDataAction = SetRootUserProfileDataState;
