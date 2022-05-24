import React, { useState } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import "../../styles/components/postBox.css";
import {
  stopProgressBar,
  startProgressBar,
} from "../../services/redux-actions";
import { isEmptyString } from "../../funcs/isEmptyString";
import { toastWarn, toastError, toastSuccess } from "../../services/toast";
import Api from "../../services/api/components/postBox";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import PostInfo from "./PostInfo";
import LikeCommentShare from "./LikeCommentShare";

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
    postCommentInfo:
      props.userFeedData.comments.by[
        Math.floor(Math.random() * props.userFeedData.comments.by.length)
      ],
  });

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
            <LikeCommentShare
              userFeedData={props.userFeedData}
              userMainInformation={props.userMainInformation}
            />
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
