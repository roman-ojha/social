export interface RootUserFriendsState {
  fetchedFriends: boolean;
  friends: [];
}

export enum RootUserFriendsActionTypes {
  SET_ROOT_USER_FRIENDS = "setRootUserFriends",
}
export interface SetRootUserFriendAction {
  type: RootUserFriendsActionTypes.SET_ROOT_USER_FRIENDS;
  payload: any;
}

export type RootUserFriendsAction = SetRootUserFriendAction;
