import React from "react";
import ReactDOM from "react-dom";
import "../styles/components/CommentBox.css";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import {
//   commentBoxAction,
//   incrementPostCommentNumber,
//   startProgressBar,
//   stopProgressBar,
//   setRootUserProfileDataState,
//   profilePageDataAction,
// } from "../services/redux-actions";
import { useState } from "react";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { toastError, toastSuccess, toastWarn } from "../services/toast";
import { isEmptyString } from "../funcs/isEmptyString";
import { useHistory } from "react-router-dom";
import GlobalApi from "../services/api/global";
import Api from "../services/api/components/postBox";
import { bindActionCreators } from "redux";
import { actionCreators } from "../services/redux";
import useRootUserProfilePageData from "../hooks/useRootUserProfilePageData";

const ReturnCommentContent = () => {
  const history = useHistory();
  const setRootUserProfilePageData = useRootUserProfilePageData();
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  const [commentInputFieldData, setCommentInputFieldData] = useState("");
  const dispatch = useDispatch();
  const userProfileDetail = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const {
    commentBoxAction,
    incrementPostCommentNumber,
    startProgressBar,
    stopProgressBar,
    setRootUserProfileDataState,
    profilePageDataAction,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    document
      .getElementsByClassName("CommentBox_Background")[0]
      .addEventListener("click", (e) => {
        if (
          !document.getElementsByClassName("CommentBox")[0].contains(e.target)
        ) {
          commentBoxAction({
            openCommentBox: false,
            postID: "",
            toId: "",
          });
        }
      });
  }, [dispatch]);

  const comment = async () => {
    try {
      startProgressBar();
      if (isEmptyString(commentInputFieldData)) {
        toastWarn("Please Fill the Comment Field Properly");
      } else {
        const res = await Api.comment({
          comment: commentInputFieldData,
          postID: commentBoxStore.postID,
          toId: commentBoxStore.toId,
          toUserId: commentBoxStore.toUserId,
        });

        const data = await res.data;
        if (res.status !== 200 && data.success) {
          toastError(data.msg);
        } else {
          incrementPostCommentNumber({
            postID: commentBoxStore.postID,
            to: commentBoxStore.toId,
          });
          commentBoxAction({
            openCommentBox: false,
            postID: commentBoxStore.postID,
            toId: commentBoxStore.toId,
            toUserId: commentBoxStore.toUserId,
            commented: true,
            newComment: commentInputFieldData,
            comments: [],
          });
          toastSuccess(data.msg);
        }
      }
      stopProgressBar();
    } catch (err) {
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

  const ViewSingleComment = (props) => {
    const routeToProfile = async (userID) => {
      try {
        startProgressBar();
        const res = await GlobalApi.getFriendData(userID);
        const userData = await res.data;
        if (res.status === 200 && userData.success) {
          // success
          const userObj = {
            ...userData.searchedUser,
            isRootUserFollowed: userData.isRootUserFollowed,
            throughRouting: true,
          };
          profilePageDataAction(userObj);
          if (userID === userProfileDetailStore.userID) {
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            });
          }
          history.push(`/u/profile/${userID}/posts`);
        } else {
          // error
          toastError(userData.msg);
        }
        stopProgressBar();
      } catch (err) {
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
        <div className="CommentBox_UserComment">
          <img
            src={
              props.comment.picture ? props.comment.picture : User_Profile_Icon
            }
            alt={props.comment.userID}
            onClick={() => {
              routeToProfile(props.comment.userID);
              commentBoxAction({
                openCommentBox: false,
                postID: "",
                toId: "",
              });
            }}
          />
          <div>
            <h3
              onClick={() => {
                routeToProfile(props.comment.userID);
                commentBoxAction({
                  openCommentBox: false,
                  postID: "",
                  toId: "",
                });
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
              // img="User"
              onClick={() => {
                setRootUserProfilePageData({
                  rootUserProfileDetail: userProfileDetailStore,
                });
                commentBoxAction({
                  openCommentBox: false,
                  postID: "",
                  toId: "",
                  toUserId: "",
                  commented: false,
                  newComment: "",
                  comments: [],
                });
                history.push(
                  `/u/profile/${userProfileDetailStore.userID}/posts`
                );
              }}
              alt="user"
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
  return ReactDOM.createPortal(
    <>{commentBoxStore.openCommentBox ? <ReturnCommentContent /> : <></>}</>,
    document.getElementById("portal-root")
  );
};

export default CommentBox;
