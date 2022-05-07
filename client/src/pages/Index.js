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

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [renderMainPage, setRenderMainPage] = useState(false);
  const getUserData = async (dispatch, history, setRenderMainPage) => {
    try {
      const res = await Api.index();
      const userData = await res.data;
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      if (!userData.userProfileDetail.userID) {
        history.push("/userid?uid=undefined");
      } else {
        dispatch(userProfileDetailAction(userData.userProfileDetail));
        dispatch(userProfilePostAction(userData.userProfileDetail.posts));
        dispatch(followedUserPostDataAction(userData.followedUserPost));
        dispatch(userSuggestionAction(userData.userSuggestion));
        dispatch(followedByUserAction(userData.followedBy));
        dispatch(setUserStories(userData.userStories));
        dispatch(messageListAction(userData.userProfileDetail.messages));
        setRenderMainPage(true);
      }
      socket.on("connect", () => {
        console.log(`connected to id: ${socket.id}`);
      });
    } catch (err) {
      history.push("/signin");
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
