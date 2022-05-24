import React, { useState } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import "../../styles/components/postBox.css";
import {
  commentBoxAction,
  stopProgressBar,
  startProgressBar,
} from "../../services/redux-actions";
import { isEmptyString } from "../../funcs/isEmptyString";
import { toastWarn, toastError, toastSuccess } from "../../services/toast";
import Api from "../../services/api/components/postBox";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import PostInfo from "./PostInfo";

const PostBox = (props) => {
  const dispatch = useDispatch();
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
        <PostImage postPicture={postInformation.postPicture} />
        <PostCaption postCaption={postInformation.postCaption} />
        <div className="HomePage_Feed_Info_Container">
          <PostInfo
            postUserID={postInformation.userID}
            postUserName={postInformation.userName}
            postUserPicture={postInformation.userPicture}
            postDate={props.userFeedData.date}
          />
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

export default PostBox;
