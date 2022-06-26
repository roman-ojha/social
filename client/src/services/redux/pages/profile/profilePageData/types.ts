export interface ProfilePageDataState {
  name: string;
  email: string;
  picture: string;
  id: string;
  userID: string;
  posts: { picture: { url: string } }[];
  friends: [];
  followings: [];
  followers: [];
}

export enum ProfilePageDataActionTypes {
  PROFILE_PAGE_DATA_ACTION = "profilePageDataAction",
  SET_PROFILE_PAGE_FRIENDS = "setProfilePageFriends",
  SET_PROFILE_PAGE_FOLLOWERS = "setProfilePageFollowers",
  SET_PROFILE_PAGE_FOLLOWINGS = "setProfilePageFollowings",
}
export interface ProfilePageDataAction {
  type: ProfilePageDataActionTypes.PROFILE_PAGE_DATA_ACTION;
  payload: any;
}

export interface SetProfilePageFriendsAction {
  type: ProfilePageDataActionTypes.SET_PROFILE_PAGE_FRIENDS;
  payload: any;
}

export interface SetProfilePageFollowersAction {
  type: ProfilePageDataActionTypes.SET_PROFILE_PAGE_FOLLOWERS;
  payload: any;
}

export interface SetProfilePageFollowingAction {
  type: ProfilePageDataActionTypes.SET_PROFILE_PAGE_FOLLOWINGS;
  payload: any;
}

export type ProfilePageAction =
  | ProfilePageDataAction
  | SetProfilePageFollowersAction
  | SetProfilePageFriendsAction
  | SetProfilePageFollowingAction;
