import React from "react";
import "../styles/components/CommentBox.css";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  commentBoxAction,
  incrementPostCommentNumber,
  startProgressBar,
  stopProgressBar,
} from "../services/redux-actions";
import { instance as axios } from "../services/axios";
import { useState } from "react";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { toastError, toastSuccess, toastWarn } from "../services/toast";
import { isEmptyString } from "../functions/isEmptyString";

const CommentBox = () => {
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  const [commentInputFieldData, setCommentInputFieldData] = useState("");
  const dispatch = useDispatch();
  const userProfileDetail = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  useEffect(() => {
    document
      .getElementsByClassName("CommentBox_Background")[0]
      .addEventListener("click", (e) => {
        if (
          !document.getElementsByClassName("CommentBox")[0].contains(e.target)
        ) {
          dispatch(
            commentBoxAction({
              openCommentBox: false,
              postID: "",
              to: "",
            })
          );
        }
      });
  }, []);

  const comment = async () => {
    try {
      dispatch(startProgressBar());
      if (isEmptyString(commentInputFieldData)) {
        toastWarn("Please Fill the Comment Field Properly");
      } else {
        const res = await axios({
          url: "/post/comment",
          method: "POST",
          data: {
            comment: commentInputFieldData,
            postID: commentBoxStore.postID,
            to: commentBoxStore.to,
          },
          withCredentials: true,
        });
        const data = await res.data;
        if (res.status !== 200 && data.success) {
          toastError(data.msg);
        } else {
          dispatch(
            incrementPostCommentNumber({
              postID: commentBoxStore.postID,
              to: commentBoxStore.to,
            })
          );
          dispatch(
            commentBoxAction({ openCommentBox: false, postID: "", to: "" })
          );
          toastSuccess(data.msg);
        }
      }
      dispatch(stopProgressBar());
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again Letter!!!");
      }
      dispatch(stopProgressBar());
    }
  };

  const ViewSingleComment = (props) => {
    return (
      <>
        <div className="CommentBox_UserComment">
          <img
            src={
              props.comment.picture ? props.comment.picture : User_Profile_Icon
            }
          />
          <div>
            <h3>{props.comment.userID}</h3>
            <p>{props.comment.comment}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="CommentBox_Background">
        <div className="CommentBox">
          <div className="CommentBox_RootUser_Post_Field_Container">
            <img
              className="CommentBox_Image"
              src={
                userProfileDetail.picture
                  ? userProfileDetail.picture
                  : User_Profile_Icon
              }
              img="User"
            />
            <input
              className="CommentBox_Input_Field"
              placeholder="Give some thought on this post..."
              type="text"
              value={commentInputFieldData}
              onChange={(e) => {
                setCommentInputFieldData(e.target.value);
              }}
            />
            <Icon
              className="CommentBox_Input_Emoji"
              icon="fluent:emoji-24-regular"
            />
            <Icon
              className="CommentBox_Input_Emoji"
              icon="bx:send"
              onClick={comment}
            />
          </div>
          <div className="CommentBox_CommentList">
            {commentBoxStore.comments.map((comment, index) => {
              return <ViewSingleComment comment={comment} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
