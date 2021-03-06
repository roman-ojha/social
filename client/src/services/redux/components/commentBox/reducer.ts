import {
  CommentBoxState,
  CommentBoxAction,
  CommentBoxActionTypes,
} from "./types";

const initialState: CommentBoxState = {
  openCommentBox: false,
  postID: "",
  toId: "",
  toUserId: "",
  commented: false,
  newComment: "",
  comments: [],
};

const commentBoxReducer = (
  state: CommentBoxState = initialState,
  action: CommentBoxAction
) => {
  switch (action.type) {
    case CommentBoxActionTypes.COMMENT_BOX:
      return action.payload;
    default:
      return state;
  }
};

export default commentBoxReducer;
