import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Api from "../../services/api/components/postBox";
import {
  commentBoxAction,
  stopProgressBar,
  startProgressBar,
} from "../../services/redux-actions";
import { useDispatch } from "react-redux";
import { toastError } from "../../services/toast";

const LikeCommentShare = (props) => {
  const dispatch = useDispatch();
  const [postInformation, setPostInformation] = useState({
    likeNo: props.userFeedData.likes.No,
    commentNo: props.userFeedData.comments.No,
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
            getComment();
          }}
        />
        <p>{postInformation.commentNo}</p>
      </div>
      <Icon className="HomePage_Feed_Share_Icon" icon="bx:share" />
      <Icon className="HomePage_Feed_More_Info_Icon" icon="ep:more" />
    </>
  );
};

export default LikeCommentShare;
