import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/pages/Index.css";
import "../styles/pages/page404.css";
import LoadingScreen from "../components/IndexPage/LoadingScreen";
import ReturnMainPage from "../components/IndexPage/ReturnMainPage";
import {
  userProfileDetailAction,
  userProfilePostAction,
  followedUserPostDataAction,
  userSuggestionAction,
  // followedByUserAction,
  // setUserStories,
  appendOnCurrentInnerUserMessage,
  appendMessageOnMessageListAction,
} from "../services/redux-actions/index";
import socket from "../services/socket";
import Api from "../services/api/pages/index";
import { toastError } from "../services/toast";
import { bindActionCreators } from "redux";
import { actionCreators } from "../services/redux";

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [renderMainPage, setRenderMainPage] = useState(false);
  const { setUserStories, setRootUserProfileDetail, setFollowedByUser } =
    bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await Api.index();
        const userData = await res.data;
        if (res.status === 200 && userData.success) {
          if (!userData.data.userProfileDetail.userID) {
            history.push("/userid?uid=undefined");
          } else {
            setRootUserProfileDetail(userData.data.userProfileDetail);
            dispatch(
              userProfilePostAction(userData.data.userProfileDetail.posts)
            );
            dispatch(
              followedUserPostDataAction(userData.data.followedUserPost)
            );
            dispatch(userSuggestionAction(userData.data.userSuggestion));
            setFollowedByUser(userData.data.followedBy);
            setUserStories(userData.data.userStories);
            setRenderMainPage(true);
          }
          socket.on("connect", () => {
            console.log(`connected to id: ${socket.id}`);
          });

          socket.emit(
            "join-room",
            userData.data.userProfileDetail.id,
            (resMessage) => {
              console.log(resMessage);
            }
          );
          socket.on("send-message-client", (res) => {
            if (res.success !== false) {
              dispatch(
                appendOnCurrentInnerUserMessage({
                  ...res.msgInfo,
                  _id: `${Math.random()}`,
                })
              );
              dispatch(
                appendMessageOnMessageListAction({
                  msgInfo: {
                    ...res.msgInfo,
                    _id: `${Math.random()}`,
                  },
                  id: res.msgInfo.senderId,
                  receiverPicture: res.senderPicture,
                  messageToUserId: res.msgInfo.senderUserId,
                })
              );
            }
          });
        } else {
          // const error = new Error(res.error);
          // throw error;
          toastError(userData.msg);
        }
      } catch (err) {
        // toastError("Some Problem Occur, Please Try again later!!!");
        history.push("/signin");
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
      }
    };
    // fetching all user data and current user following user Post data
    getUserData();
  }, [dispatch, history]);

  return (
    <>
      <div className="MainPage_Container">
        {renderMainPage ? <ReturnMainPage /> : <LoadingScreen />}
      </div>
    </>
  );
};

export default Index;
