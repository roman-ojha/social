import React, { useEffect, memo } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../../services/api/global";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";
// import {
//   startProgressBar,
//   stopProgressBar,
//   profilePageDataAction,
//   setRootUserProfileDataState,
//   commentBoxAction,
// } from "../../services/redux-actions";
import { useHistory } from "react-router-dom";
import { AppState, actionCreators } from "../../../src/services/redux";
import { CommentInfoState, PostBoxProps } from "./PostBox";
import { bindActionCreators } from "redux";

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
  const history = useHistory();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const commentBoxStore = useSelector(
    (state: AppState) => state.commentBoxReducer
  );
  const {
    startProgressBar,
    stopProgressBar,
    profilePageDataAction,
    setRootUserProfileDataState,
    commentBoxAction,
  } = bindActionCreators(actionCreators, dispatch);

  const routeToProfile = async (userID: string): Promise<void> => {
    try {
      startProgressBar();
      const res = await GlobalApi.getFriendData(userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        profilePageDataAction(userObj);
        if (userID === userProfileDetailStore.userID) {
          setRootUserProfileDataState({
            fetchedRootUserProfileData: true,
            getRootUserProfileData: false,
          });
        }
        history.push(`/u/profile/${userID}/posts`);
      } else {
        // error
        toastError(userData.msg);
      }
      stopProgressBar();
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      stopProgressBar();
    }
  };

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
                routeToProfile(commentInfo.postCommentInfo.userID);
              }}
            />
            <div>
              <h3
                onClick={() => {
                  routeToProfile(commentInfo.postCommentInfo.userID);
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
