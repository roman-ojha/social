import React, { useEffect, memo } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppState, actionCreators } from "../../../src/services/redux";
import { CommentInfoState, PostBoxProps } from "./PostBox";
import { bindActionCreators } from "redux";
import useRouteToProfilePage from "../../hooks/useRouteToProfilePage";

interface CommentedUserProps {
  commentInfo: CommentInfoState;
  postId: PostBoxProps["userFeedData"]["id"];
  setCommentInfo: React.Dispatch<React.SetStateAction<CommentInfoState>>;
}

const CommentedUser: React.FC<CommentedUserProps> = ({
  commentInfo,
  postId,
  setCommentInfo,
}): JSX.Element => {
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const commentBoxStore = useSelector(
    (state: AppState) => state.commentBoxReducer
  );
  const { commentBoxAction } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (commentBoxStore.commented && commentBoxStore.postID === postId) {
      setCommentInfo({
        ...commentInfo,
        postCommentInfo: {
          userID: userProfileDetailStore.userID,
          comment: commentBoxStore.newComment,
          picture: userProfileDetailStore.picture,
        },
        commentNo: commentInfo.commentNo + 1,
      });
      commentBoxAction({
        openCommentBox: false,
        postID: "",
        toId: "",
        toUserId: "",
        commented: false,
        newComment: "",
        comments: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentBoxStore.commented]);

  return (
    <>
      <div className="UserPostFeed_CommentBox_CommentList">
        {commentInfo.postCommentInfo ? (
          <div className="UserPostFeed_CommentBox_UserComment">
            <img
              src={
                commentInfo.postCommentInfo.picture
                  ? commentInfo.postCommentInfo.picture
                  : User_Profile_Icon
              }
              alt={commentInfo.postCommentInfo.userID}
              onClick={() => {
                // routeToProfile(commentInfo.postCommentInfo.userID);
                routeToProfilePage({
                  userID: commentInfo.postCommentInfo.userID,
                  from: "postBox",
                });
              }}
            />
            <div>
              <h3
                onClick={() => {
                  // routeToProfile(commentInfo.postCommentInfo.userID);
                  routeToProfilePage({
                    userID: commentInfo.postCommentInfo.userID,
                    from: "postBox",
                  });
                }}
              >
                {commentInfo.postCommentInfo.userID}
              </h3>
              <p>{commentInfo.postCommentInfo.comment}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default memo(CommentedUser);
