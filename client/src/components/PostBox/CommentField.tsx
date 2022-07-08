import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
// import {
//   startProgressBar,
//   stopProgressBar,
//   profilePageDataAction,
//   setRootUserProfileDataState,
// } from "../../services/redux-actions";
import { isEmptyString } from "../../funcs/isEmptyString";
import { toastWarn, toastError, toastSuccess } from "../../services/toast";
import Api from "../../services/api/components/postBox";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../src/services/redux";
import { CommentInfoState, PostBoxProps } from "./PostBox";
import { AxiosError } from "axios";
import { ProfilePageDataState } from "../../services/redux/pages/profile/profilePageData/types";

interface CommentFieldProps {
  userFeedData: PostBoxProps["userFeedData"];
  userMainInformation: PostBoxProps["userMainInformation"];
  commentInfo: CommentInfoState;
  setCommentInfo: React.Dispatch<React.SetStateAction<CommentInfoState>>;
}

const CommentField: React.FC<CommentFieldProps> = ({
  commentInfo,
  setCommentInfo,
  userFeedData,
  userMainInformation,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const [commentInputField, setCommentInputField] = useState("");
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const {
    startProgressBar,
    stopProgressBar,
    profilePageDataAction,
    setRootUserProfileDataState,
  } = bindActionCreators(actionCreators, dispatch);

  const comment = async (): Promise<void> => {
    try {
      startProgressBar();
      if (isEmptyString(commentInputField)) {
        toastWarn("Please Fill the Comment Field Properly");
      } else {
        const res = await Api.comment({
          comment: commentInputField,
          postID: userFeedData.id,
          toId: userMainInformation.id,
          toUserId: userMainInformation.userID,
        });
        const data = await res.data;
        if (res.status === 200 && data.success) {
          setCommentInfo({
            ...commentInfo,
            postCommentInfo: {
              userID: userProfileDetailStore.userID,
              comment: commentInputField,
              picture: userProfileDetailStore.picture,
            },
            commentNo: commentInfo.commentNo + 1,
          });
          toastSuccess(data.msg);
          setCommentInputField("");
        } else {
          toastError(data.msg);
        }
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
      <div className="UserPostFeed_CommentBox_RootUser_Post_Field_Container">
        <img
          className="UserPostFeed_CommentBox_Image"
          src={
            userProfileDetailStore.picture
              ? userProfileDetailStore.picture
              : User_Profile_Icon
          }
          // img={userProfileDetailStore.userID}
          onClick={() => {
            const userObj: ProfilePageDataState = {
              ...userProfileDetailStore,
              isRootUserFollowed: false,
              throughRouting: true,
            };
            profilePageDataAction(userObj);
            if (!rootUserProfileDataState.fetchedRootUserProfileData) {
              setRootUserProfileDataState({
                fetchedRootUserProfileData: false,
                getRootUserProfileData: true,
              });
            }
            history.push(`/u/profile/${userProfileDetailStore.userID}/posts`);
          }}
          alt=""
        />
        <input
          className="UserPostFeed_CommentBox_Input_Field"
          placeholder="Give some thought on this post..."
          type="text"
          value={commentInputField}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              comment();
            }
          }}
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
    </>
  );
};

export default CommentField;
