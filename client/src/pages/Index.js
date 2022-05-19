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
  followedByUserAction,
  setUserStories,
  messageListAction,
} from "../services/redux-actions/index";
import socket from "../services/socket";
import Api from "../services/api/pages/index";
import { toastError } from "../services/toast";

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [renderMainPage, setRenderMainPage] = useState(false);
  const getUserData = async (dispatch, history, setRenderMainPage) => {
    try {
      const res = await Api.index();
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        if (!userData.data.userProfileDetail.userID) {
          history.push("/userid?uid=undefined");
        } else {
          dispatch(userProfileDetailAction(userData.data.userProfileDetail));
          dispatch(
            userProfilePostAction(userData.data.userProfileDetail.posts)
          );
          dispatch(followedUserPostDataAction(userData.data.followedUserPost));
          dispatch(userSuggestionAction(userData.data.userSuggestion));
          dispatch(followedByUserAction(userData.data.followedBy));
          dispatch(setUserStories(userData.data.userStories));
          dispatch(messageListAction(userData.data.userProfileDetail.messages));
          setRenderMainPage(true);
        }
        socket.on("connect", () => {
          console.log(`connected to id: ${socket.id}`);
        });
      } else {
        // const error = new Error(res.error);
        // throw error;
        toastError(userData.msg);
      }
    } catch (err) {
      // toastError("Some Problem Occur, Please Try again later!!!");
      history.push("/signin");
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };
  useEffect(() => {
    // fetching all user data and current user following user Post data
    getUserData(dispatch, history, setRenderMainPage);
  }, []);

  return (
    <>
      <div className="MainPage_Container">
        {renderMainPage ? <ReturnMainPage /> : <LoadingScreen />}
      </div>
    </>
  );
};

export default Index;
