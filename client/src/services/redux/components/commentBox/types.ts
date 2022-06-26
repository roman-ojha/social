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
  COMMENT_BOX = "commentBox",
}
export interface SetCommentBoxAction {
  type: CommentBoxActionTypes.COMMENT_BOX;
  payload: CommentBoxState;
}

export type CommentBoxAction = SetCommentBoxAction;
