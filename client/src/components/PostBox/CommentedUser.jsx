import React, { useEffect } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../../services/api/global";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";
import {
  startProgressBar,
  stopProgressBar,
  profilePageDataAction,
  setRootUserProfileDataState,
  commentBoxAction,
} from "../../services/redux-actions";
import { useHistory } from "react-router-dom";

const CommentedUser = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);

  const routeToProfile = async (userID) => {
    try {
      dispatch(startProgressBar());
      const res = await GlobalApi.getFriendData(userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        dispatch(profilePageDataAction(userObj));
        if (userID === userProfileDetailStore.userID) {
          dispatch(
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            })
          );
        }
        history.push(`/u/profile/${userID}/posts`);
      } else {
        // error
        toastError(userData.msg);
      }
      dispatch(stopProgressBar());
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };

  useEffect(() => {
    if (commentBoxStore.commented && commentBoxStore.postID === props.postId) {
      props.setCommentInfo({
        ...props.commentInfo,
        postCommentInfo: {
          userID: userProfileDetailStore.userID,
          comment: commentBoxStore.newComment,
          picture: userProfileDetailStore.picture,
        },
        commentNo: props.commentInfo.commentNo + 1,
      });
      dispatch(
        commentBoxAction({
          openCommentBox: false,
          postID: "",
          toId: "",
          toUserId: "",
          commented: false,
          newComment: "",
          comments: [],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentBoxStore.commented]);

  return (
    <>
      <div className="UserPostFeed_CommentBox_CommentList">
        {props.commentInfo.postCommentInfo ? (
          <div className="UserPostFeed_CommentBox_UserComment">
            <img
              src={
                props.commentInfo.postCommentInfo.picture
                  ? props.commentInfo.postCommentInfo.picture
                  : User_Profile_Icon
              }
              alt={props.commentInfo.postCommentInfo.userID}
              onClick={() => {
                routeToProfile(props.commentInfo.postCommentInfo.userID);
              }}
            />
            <div>
              <h3
                onClick={() => {
                  routeToProfile(props.commentInfo.postCommentInfo.userID);
                }}
              >
                {props.commentInfo.postCommentInfo.userID}
              </h3>
              <p>{props.commentInfo.postCommentInfo.comment}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CommentedUser;
