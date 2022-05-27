import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../../services/api/global";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";
import {
  startProgressBar,
  stopProgressBar,
  profilePageDataAction,
  setRootUserProfileDataState,
} from "../../services/redux-actions";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const CommentedUser = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);

  const [commentedUserInfo, setCommentedUserInfo] = useState(
    props.commentInfo.postCommentInfo
      ? {
          postId: props.postId,
          doesHaveComment: true,
          picture: props.commentInfo.postCommentInfo.picture,
          userID: props.commentInfo.postCommentInfo.userID,
          comment: props.commentInfo.postCommentInfo.comment,
        }
      : {
          postId: props.postId,
          doesHaveComment: false,
          picture: "",
          userID: "",
          comment: "",
        }
  );
  // console.log(commentedUserInfo);

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
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };

  useEffect(() => {
    if (
      commentBoxStore.commented &&
      commentBoxStore.postID === commentedUserInfo.postId
    ) {
      setCommentedUserInfo({
        postId: props.postId,
        doesHaveComment: true,
        picture: userProfileDetailStore.picture,
        userID: userProfileDetailStore.userID,
        comment: commentBoxStore.newComment,
      });
    }
  }, [commentBoxStore.commented]);

  return (
    <>
      <div className="UserPostFeed_CommentBox_CommentList">
        {commentedUserInfo.doesHaveComment ? (
          <div className="UserPostFeed_CommentBox_UserComment">
            <img
              src={
                commentedUserInfo.picture
                  ? commentedUserInfo.picture
                  : User_Profile_Icon
              }
              alt={commentedUserInfo.userID}
              onClick={() => {
                routeToProfile(commentedUserInfo.userID);
              }}
            />
            <div>
              <h3
                onClick={() => {
                  routeToProfile(commentedUserInfo.userID);
                }}
              >
                {commentedUserInfo.userID}
              </h3>
              <p>{commentedUserInfo.comment}</p>
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
