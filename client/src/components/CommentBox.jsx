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
  setRootUserProfileDataState,
  profilePageDataAction
} from "../services/redux-actions";
import { useState } from "react";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { toastError, toastSuccess, toastWarn } from "../services/toast";
import { isEmptyString } from "../funcs/isEmptyString";
import { useHistory } from "react-router-dom";
import GlobalApi from "../services/api/global";
import Api from "../services/api/components/postBox";

const ReturnCommentContent = () => {
  const history = useHistory();
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  const [commentInputFieldData, setCommentInputFieldData] = useState("");
  const dispatch = useDispatch();
  const userProfileDetail = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
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
              to: ""
            })
          );
        }
      });
  }, [dispatch]);

  const comment = async () => {
    try {
      dispatch(startProgressBar());
      if (isEmptyString(commentInputFieldData)) {
        toastWarn("Please Fill the Comment Field Properly");
      } else {
        const res = await Api.comment({
          comment: commentInputFieldData,
          postID: commentBoxStore.postID,
          toId: commentBoxStore.toId,
          toUserId: commentBoxStore.toUserId
        });

        const data = await res.data;
        if (res.status !== 200 && data.success) {
          toastError(data.msg);
        } else {
          dispatch(
            incrementPostCommentNumber({
              postID: commentBoxStore.postID,
              to: commentBoxStore.to
            })
          );
          dispatch(
            commentBoxAction({
              openCommentBox: false,
              postID: commentBoxStore.postID,
              toId: commentBoxStore.toId,
              toUserId: commentBoxStore.toUserId,
              commented: true,
              newComment: commentInputFieldData,
              comments: []
            })
          );
          toastSuccess(data.msg);
        }
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

  const ViewSingleComment = (props) => {
    const routeToProfile = async (userID) => {
      try {
        dispatch(startProgressBar());
        const res = await GlobalApi.getFriendData(userID);
        const userData = await res.data;
        if (res.status === 200 && userData.success) {
          // success
          const userObj = {
            ...userData.searchedUser,
            isRootUserFollowed: userData.isRootUserFollowed
          };
          dispatch(profilePageDataAction(userObj));
          if (userID === userProfileDetailStore.userID) {
            dispatch(
              setRootUserProfileDataState({
                fetchedRootUserProfileData: true,
                getRootUserProfileData: false
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
        <div className="CommentBox_UserComment">
          <img
            src={
              props.comment.picture ? props.comment.picture : User_Profile_Icon
            }
            alt={props.comment.userID}
            onClick={() => {
              routeToProfile(props.comment.userID);
              dispatch(
                commentBoxAction({
                  openCommentBox: false,
                  postID: "",
                  to: ""
                })
              );
            }}
          />
          <div>
            <h3
              onClick={() => {
                routeToProfile(props.comment.userID);
                dispatch(
                  commentBoxAction({
                    openCommentBox: false,
                    postID: "",
                    to: ""
                  })
                );
              }}
            >
              {props.comment.userID}
            </h3>
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
              onClick={() => {
                const userObj = {
                  ...userProfileDetailStore,
                  isRootUserFollowed: false
                };
                dispatch(profilePageDataAction(userObj));
                if (!rootUserProfileDataState.fetchedRootUserProfileData) {
                  dispatch(
                    setRootUserProfileDataState({
                      fetchedRootUserProfileData: false,
                      getRootUserProfileData: true
                    })
                  );
                }
                dispatch(
                  commentBoxAction({
                    openCommentBox: false,
                    postID: "",
                    toId: "",
                    toUserId: "",
                    commented: false,
                    newComment: "",
                    comments: []
                  })
                );
                history.push(
                  `/u/profile/${userProfileDetailStore.userID}/posts`
                );
              }}
              alt=""
            />
            <input
              className="CommentBox_Input_Field"
              placeholder="Give some thought on this post..."
              type="text"
              autoFocus
              value={commentInputFieldData}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  comment();
                }
              }}
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

const CommentBox = () => {
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  return <>{commentBoxStore.openCommentBox ? <ReturnCommentContent /> : ""}</>;
};

export default CommentBox;
