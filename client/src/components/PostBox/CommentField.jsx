import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch } from "react-redux";
import {
  startProgressBar,
  stopProgressBar,
} from "../../services/redux-actions";
import { isEmptyString } from "../../funcs/isEmptyString";
import { toastWarn, toastError, toastSuccess } from "../../services/toast";
import Api from "../../services/api/components/postBox";

const CommentField = (props) => {
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const [commentInputField, setCommentInputField] = useState("");

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
          props.setCommentInfo({
            ...props.commentInfo,
            postCommentInfo: {
              userID: userProfileDetailStore.userID,
              comment: commentInputField,
              picture: userProfileDetailStore.picture,
            },
            commentNo: props.commentInfo.commentNo + 1,
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
        <form
          className="UserPostFeed_CommentBox_Form"
          onSubmit={(e) => {
            e.preventDefault();
            comment();
          }}
        >
          <input
            className="UserPostFeed_CommentBox_Input_Field"
            placeholder="Give some thought on this post..."
            type="text"
            value={commentInputField}
            onChange={(e) => {
              setCommentInputField(e.target.value);
            }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          />
        </form>
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
    </>
  );
};

export default CommentField;
