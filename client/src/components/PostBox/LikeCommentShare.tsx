import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Api from "../../services/api/components/postBox";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../src/services/redux";
import { PostBoxProps } from "./PostBox";
import { AxiosError } from "axios";

interface LikeCommentShareProps {
  userFeedData: PostBoxProps["userFeedData"];
  userMainInformation: PostBoxProps["userMainInformation"];
  commentNo: number;
}

const LikeCommentShare: React.FC<LikeCommentShareProps> = ({
  commentNo,
  userFeedData,
  userMainInformation,
}): JSX.Element => {
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const dispatch = useDispatch();
  const [likeInfo, setLikeInfo] = useState({
    likeNo: userFeedData.likes.No,
    isLikedPost: userFeedData.likes.by
      ? userFeedData.likes.by.some(
          (el) => el.user === userProfileDetailStore.id
        )
      : [],
  });
  const { commentBoxAction, stopProgressBar, startProgressBar } =
    bindActionCreators(actionCreators, dispatch);

  const like = async (): Promise<void> => {
    try {
      const res = await Api.like({
        postID: userFeedData.id,
        toUserId: userMainInformation.userID,
        toId: userMainInformation.id,
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
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };

  const getComment = async (): Promise<void> => {
    try {
      startProgressBar();
      const res = await Api.getComment({
        postID: userFeedData.id,
        userID: userMainInformation.userID,
        id: userMainInformation.id,
      });
      const data = await res.data;
      if (res.status === 200 && data.success) {
        commentBoxAction({
          openCommentBox: true,
          postID: userFeedData.id,
          toId: userMainInformation.id,
          toUserId: userMainInformation.userID,
          commented: false,
          newComment: "",
          comments: data.comment.by,
        });
      } else {
        toastError(data.msg);
      }
      stopProgressBar();
    } catch (error) {
      const err = error as AxiosError;
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
          <p>{commentNo}</p>
        </div>
        <Icon className="HomePage_Feed_Share_Icon" icon="bx:share" />
        <Icon className="HomePage_Feed_More_Info_Icon" icon="ep:more" />
      </div>
    </>
  );
};

export default LikeCommentShare;
