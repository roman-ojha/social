import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Api from "../../services/api/components/postBox";
import {
  commentBoxAction,
  stopProgressBar,
  startProgressBar,
} from "../../services/redux-actions";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";

const LikeCommentShare = (props) => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const dispatch = useDispatch();
  const [likeInfo, setLikeInfo] = useState({
    likeNo: props.userFeedData.likes.No,
    isLikedPost: props.userFeedData.likes.by.some(
      (el) => el.user === userProfileDetailStore.id
    ),
  });

  const like = async () => {
    try {
      const res = await Api.like({
        postID: props.userFeedData.id,
        toUserId: props.userMainInformation.userID,
        toId: props.userMainInformation.id,
        likeNo: likeInfo.likeNo,
      });
      const data = await res.data;
      if (data.success && res.status === 200 && !data.removed) {
        // Liked the post
        setLikeInfo({
          ...likeInfo,
          likeNo: data.likeNo,
          isLikedPost: true,
        });
      } else if (data.success && res.status === 200 && data.removed) {
        // Removed Like from the post Post
        setLikeInfo({
          ...likeInfo,
          likeNo: data.likeNo,
          isLikedPost: false,
        });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };

  const getComment = async () => {
    try {
      dispatch(startProgressBar());
      const res = await Api.getComment({
        postID: props.userFeedData.id,
        userID: props.userMainInformation.userID,
        id: props.userMainInformation.id,
      });
      const data = await res.data;
      if (res.status === 200 && data.success) {
        dispatch(
          commentBoxAction({
            openCommentBox: true,
            postID: props.userFeedData.id,
            toId: props.userMainInformation.id,
            toUserId: props.userMainInformation.userID,
            commented: false,
            newComment: "",
            comments: data.comment.by,
          })
        );
      } else {
        toastError(data.msg);
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

  return (
    <>
      <div className="HomePage_Feed_Love_Comment_Share_Info_Container">
        <div className="HomePage_Feed_Icon_Container" onClick={like}>
          {likeInfo.isLikedPost ? (
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
          <p>{likeInfo.likeNo}</p>
        </div>
        <div className="HomePage_Feed_Icon_Container">
          <Icon
            className="HomePage_Feed__Comment_Icon"
            icon="akar-icons:comment"
            onClick={() => {
              getComment();
            }}
          />
          <p>{props.commentNo}</p>
        </div>
        <Icon className="HomePage_Feed_Share_Icon" icon="bx:share" />
        <Icon className="HomePage_Feed_More_Info_Icon" icon="ep:more" />
      </div>
    </>
  );
};

export default LikeCommentShare;
