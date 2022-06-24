export interface FollowedUserPostDataState {
  userID: string;
  posts: { id: string; comments: { No: number } }[];
}

export enum FollowedUserPostDataActionTypes {
  SET_FOLLOWED_USER_POST_DATA = "followedUserPostData",
  INCREMENT_POST_COMMENT_NUMBER = "incrementPostCommentNumber",
}

export interface IncrementPostCommentNumberAction {
  type: FollowedUserPostDataActionTypes.INCREMENT_POST_COMMENT_NUMBER;
  payload: any;
}

export interface SetFollowedUserPostData {
  type: FollowedUserPostDataActionTypes.SET_FOLLOWED_USER_POST_DATA;
  payload: any;
}

export type FollowedUserPostDataAction =
  | IncrementPostCommentNumberAction
  | SetFollowedUserPostData;
