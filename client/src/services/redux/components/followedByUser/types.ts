export interface FollowedByState {
  userID: string;
  followed: boolean;
  type: string;
}

export enum FollowedByActionTypes {
  SET_FOLLOWED_BY_USER = "followedByUser",
  SET_IS_FOLLOWED_FOLLOWED_BY_USER = "isFollowedFollowedByUser",
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
