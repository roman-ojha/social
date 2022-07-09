import React from "react";
import ReactDOM from "react-dom";
import "../styles/components/CommentBox.css";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { toastError, toastSuccess, toastWarn } from "../services/toast";
import { isEmptyString } from "../funcs/isEmptyString";
import { useHistory } from "react-router-dom";
import Api from "../services/api/components/postBox";
import { bindActionCreators } from "redux";
import { actionCreators, AppState } from "../services/redux";
import useRootUserProfilePageData from "../hooks/useRootUserProfilePageData";
import useRouteToProfilePage from "../hooks/useRouteToProfilePage";
import { AxiosError } from "axios";

const ReturnCommentContent = (): JSX.Element => {
  const history = useHistory();
  const setRootUserProfilePageData = useRootUserProfilePageData();
  const routeToProfilePage = useRouteToProfilePage();
  const commentBoxStore = useSelector(
    (state: AppState) => state.commentBoxReducer
  );
  const [commentInputFieldData, setCommentInputFieldData] = useState("");
  const dispatch = useDispatch();
  const userProfileDetail = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const {
    commentBoxAction,
    incrementPostCommentNumber,
    startProgressBar,
    stopProgressBar,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    document
      .getElementsByClassName("CommentBox_Background")[0]
      .addEventListener("click", (e) => {
        if (
          !document
            .getElementsByClassName("CommentBox")[0]
            .contains(e.target as Node)
        ) {
          commentBoxAction({
            openCommentBox: false,
            postID: "",
            toId: "",
            toUserId: "",
            commented: false,
            newComment: "",
            comments: [],
          });
        }
      });
  }, [dispatch]);

  const comment = async (): Promise<void> => {
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

  const ViewSingleComment = ({ comment }): JSX.Element => {
    return (
      <>
        <div className="CommentBox_UserComment">
          <img
            src={comment.picture ? comment.picture : User_Profile_Icon}
            alt={comment.userID}
            onClick={() => {
              routeToProfilePage({
                userID: comment.userID,
                from: "commentBox",
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
            }}
          />
          <div>
            <h3
              onClick={() => {
                routeToProfilePage({
                  userID: comment.userID,
                  from: "commentBox",
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
              }}
            >
              {comment.userID}
            </h3>
            <p>{comment.comment}</p>
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

const CommentBox = (): React.ReactPortal => {
  const commentBoxStore = useSelector(
    (state: AppState) => state.commentBoxReducer
  );
  return ReactDOM.createPortal(
    <>{commentBoxStore.openCommentBox ? <ReturnCommentContent /> : <></>}</>,
    document.getElementById("portal-root") as HTMLElement
  );
};

export default CommentBox;
