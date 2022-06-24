import { UserDocumentFollower } from "../../../../interface/userDocument";

export interface FollowedByState {
  userID: "";
  followed: "";
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
  payload: any;
}

export type FollowedByAction =
  | SetFollowedByAction
  | IsFollowedFollowedByUserAction;
