import React, { useState } from "react";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import "../styles/components/userPostFeed.css";
import { useHistory } from "react-router-dom";
import {
  commentBoxAction,
  stopProgressBar,
  startProgressBar,
} from "../services/redux-actions";
import { isEmptyString } from "../funcs/isEmptyString";
import { toastWarn, toastError, toastSuccess } from "../services/toast";
import Api from "../services/api/components/userPostFeed";

const UserPostFeed = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let uploadedTime;
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const [commentInputField, setCommentInputField] = useState("");
  const [postInformation, setPostInformation] = useState({
    postPicture: props.userFeedData.picture
      ? props.userFeedData.picture.url
      : undefined,
    postCaption: props.userFeedData.caption,
    userPicture: props.userMainInformation.picture,
    userID: props.userMainInformation.userID,
    userName: props.userMainInformation.name,
    isLikedPost: props.userFeedData.likes.by.some(
      (el) => el.userID === userProfileDetailStore.userID
    ),
    likeNo: props.userFeedData.likes.No,
    commentNo: props.userFeedData.comments.No,
    postCommentInfo:
      props.userFeedData.comments.by[
        Math.floor(Math.random() * props.userFeedData.comments.by.length)
      ],
  });
  const userPostdate = new Date(props.userFeedData.date);
  // const userPostUTCTime = userPostdate.toUTCString();
  const currentDate = new Date();
  // const currentUTCTime = currentDate.toUTCString();
  const difference = (currentDate.getTime() - userPostdate.getTime()) / 1000;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (difference < 60) {
    uploadedTime = `${parseInt(difference)}s`;
  } else if (difference >= 60 && difference < 3600) {
    uploadedTime = `${parseInt(difference / 60)}m`;
  } else if (difference >= 3600 && difference < 86400) {
    uploadedTime = `${parseInt(difference / 3600)}hr`;
  } else if (difference >= 86400 && difference < 604800) {
    uploadedTime = `${parseInt(difference / 86400)}d`;
  } else if (difference >= 604800 && difference < 31536000) {
    let getDate = userPostdate.getDate();
    let getMonth = userPostdate.getMonth();
    let getHour = userPostdate.getHours();
    let getMinute = userPostdate.getMinutes();
    uploadedTime = `${monthNames[getMonth]} ${getDate} at ${getHour}:${getMinute}`;
  } else {
    let getDate = userPostdate.getDate();
    let getYear = userPostdate.getFullYear();
    let getMonth = userPostdate.getMonth();
    uploadedTime = `${monthNames[getMonth]} ${getDate}, ${getYear}`;
  }

  const like = async () => {
    try {
      const res = await Api.like({
        postID: props.userFeedData.id,
        toUserId: props.userMainInformation.userID,
        toId: props.userMainInformation.id,
        likeNo: postInformation.likeNo,
      });
      const data = await res.data;
      if (data.success && res.status === 200 && !data.removed) {
        // Liked the post
        setPostInformation({
          ...postInformation,
          likeNo: data.likeNo,
          isLikedPost: true,
        });
      } else if (data.success && res.status === 200 && data.removed) {
        // Removed Like from the post Post
        setPostInformation({
          ...postInformation,
          likeNo: data.likeNo,
          isLikedPost: false,
        });
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };
  const comment = async () => {
    try {
      dispatch(startProgressBar());
      if (isEmptyString(commentInputField)) {
        toastWarn("Please Fill the Comment Field Properly");
      } else {
        const res = await Api.comment({
          comment: commentInputField,
          postID: props.userFeedData.id,
          toId: props.userMainInformation.id,
          toUserId: props.userMainInformation.userID,
        });
        const data = await res.data;
        if (res.status !== 200 && data.success) {
          toastError(data.msg);
        } else {
          setPostInformation({
            ...postInformation,
            postCommentInfo: {
              userID: userProfileDetailStore.userID,
              comment: commentInputField,
              picture: userProfileDetailStore.picture,
            },
            commentNo: postInformation.commentNo + 1,
          });
          toastSuccess(data.msg);
        }
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
  const getComment = async () => {
    try {
      dispatch(startProgressBar());
      const res = await Api.getComment({
        postID: props.userFeedData.id,
        userID: props.userMainInformation.userID,
      });
      const data = await res.data;
      if (res.status === 200 && data.success) {
        dispatch(
          commentBoxAction({
            openCommentBox: true,
            postID: props.userFeedData.id,
            to: props.userMainInformation.userID,
            comments: data.comment.by,
          })
        );
      } else {
        toastError(data.msg);
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

  return (
    <>
      <div className="HomePage_Feed_Content_Container">
        <div className="HomePage_Feed_Image_Container">
          {postInformation.postPicture === undefined ? (
            ""
          ) : (
            <img src={postInformation.postPicture} alt="post" />
          )}
        </div>
        <div className="HomePage_Feed_User_Caption_Container">
          <p>{postInformation.postCaption}</p>
        </div>
        <div className="HomePage_Feed_Info_Container">
          <div className="HomePage_Feed_Info_User_Image">
            <img
              src={
                postInformation.userPicture === undefined
                  ? User_Profile_Icon
                  : postInformation.userPicture
              }
              onClick={() => {
                history.push(`/u/profile/${postInformation.userID}/posts`);
              }}
              alt="user"
            />
          </div>
          <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
            <div className="HomePage_Feed_User_Name_Info_Container">
              <p
                className="HomePage_Feed_User_ID_Text"
                onClick={() => {
                  history.push(`/u/profile/${postInformation.userID}/posts`);
                }}
              >
                {postInformation.userID}
              </p>
              <p
                className="HomePage_Feed_User_Name_Text"
                onClick={() => {
                  history.push(`/u/profile/${postInformation.userID}/posts`);
                }}
              >
                {postInformation.userName}
              </p>
            </div>
            <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
          </div>
          <div className="HomePage_Feed_Love_Comment_Share_Info_Container">
            <div className="HomePage_Feed_Icon_Container" onClick={like}>
              {postInformation.isLikedPost ? (
                <Icon
                  className="HomePage_Feed_Liked_Love_Icon"
                  icon="fluent:thumb-like-20-filled"
                />
              ) : (
                <Icon
                  className="HomePage_Feed_UnLiked_Love_Icon"
                  icon="fluent:thumb-like-20-regular"
                />
              )}
              <p>{postInformation.likeNo}</p>
            </div>
            <div className="HomePage_Feed_Icon_Container">
              <Icon
                className="HomePage_Feed__Comment_Icon"
                icon="akar-icons:comment"
                onClick={() => {
                  // dispatch(
                  //   commentBoxAction({
                  //     openCommentBox: true,
                  //     postID: props.userFeedData.id,
                  //     to: props.userMainInformation.userID,
                  //     comments: props.userFeedData.comments.by,
                  //   })
                  // );
                  getComment();
                }}
              />
              <p>{postInformation.commentNo}</p>
            </div>
            <Icon className="HomePage_Feed_Share_Icon" icon="bx:share" />
            <Icon className="HomePage_Feed_More_Info_Icon" icon="ep:more" />
          </div>
        </div>
        <div className="UserPostFeed_Comment_Box">
          <div className="UserPostFeed_CommentBox_CommentList">
            {postInformation.postCommentInfo ? (
              <div className="UserPostFeed_CommentBox_UserComment">
                <img
                  src={
                    postInformation.postCommentInfo.picture
                      ? postInformation.postCommentInfo.picture
                      : User_Profile_Icon
                  }
                />
                <div>
                  <h3 onClick={() => {}}>
                    {postInformation.postCommentInfo.userID}
                  </h3>
                  <p>{postInformation.postCommentInfo.comment}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="UserPostFeed_CommentBox_RootUser_Post_Field_Container">
            <img
              className="UserPostFeed_CommentBox_Image"
              src={
                userProfileDetailStore.picture
                  ? userProfileDetailStore.picture
                  : User_Profile_Icon
              }
              img="User"
            />
            <input
              className="UserPostFeed_CommentBox_Input_Field"
              placeholder="Give some thought on this post..."
              type="text"
              value={commentInputField}
              onChange={(e) => {
                setCommentInputField(e.target.value);
              }}
            />
            <Icon
              className="UserPostFeed_CommentBox_Input_Emoji"
              icon="fluent:emoji-24-regular"
            />
            <Icon
              className="UserPostFeed_CommentBox_Input_Emoji"
              icon="bx:send"
              onClick={comment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPostFeed;
