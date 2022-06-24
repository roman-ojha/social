export interface CommentBoxState {
  openCommentBox: boolean;
  postID: string;
  toId: string;
  toUserId: string;
  commented: boolean;
  newComment: string;
  comments: [];
}

export enum CommentBoxActionTypes {
  SET_COMMENT_BOX_DATA = "setCommentBoxData",
}
export interface SetCommentBoxAction {
  type: CommentBoxActionTypes.SET_COMMENT_BOX_DATA;
  payload: any;
}

export type CommentBoxAction = SetCommentBoxAction;
