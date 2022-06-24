export interface FollowedByState {
  userID: string;
  followed: string;
  type: string;
}

export enum FollowedByActionTypes {
  SET_FOLLOWED_BY_USER = "setFollowedByUser",
  SET_IS_FOLLOWED_FOLLOWED_BY_USER = "setIsFollowedFollowedByUser",
}
export interface SetFollowedByAction {
  type: FollowedByActionTypes.SET_FOLLOWED_BY_USER;
  payload: any;
}

export interface IsFollowedFollowedByUserAction {
  type: FollowedByActionTypes.SET_IS_FOLLOWED_FOLLOWED_BY_USER;
  payload: FollowedByState;
}

export type FollowedByAction =
  | SetFollowedByAction
  | IsFollowedFollowedByUserAction;
