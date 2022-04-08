import React, { useEffect, useState } from "react";
import MainPageSideBar from "../react-components/MainPageSideBar";
import MainPageStory from "../react-components/MainPageStory";
import MainPageMsgAndNtfBar from "../react-components/MainPageMsgAndNtfBar";
import MainPageRightSideComp from "../react-components/MainPageRightSideComp";
import AppIcon from "../assets/icons/Social_Icon.ico";
import HomePage from "./HomePage";
import VideoPage from "./VideoPage";
import MessagePage from "./MessagePage";
import SettingPage from "./SettingPage";
import ProfilePage from "./ProfilePage";
import Page404 from "./Page404";
import CommentBox from "../react-components/CommentBox";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfileDetailAction,
  userProfilePostAction,
  followedUserPostDataAction,
  userSuggestionAction,
  followedByUserAction,
  userStoriesAction,
  messageListAction,
} from "../redux-actions/index";
import { instance as axios } from "../services/axios";
import socket from "../services/socket";
import "../styles/pages/Index.css";
import "../styles/pages/page404.css";

const RoutingMainPage = () => {
  return (
    <>
      <Switch>
        <Route exact path="/u" component={HomePage} />
        <Route exact path="/u/video" component={VideoPage} />
        <Route exact path="/u/message" component={MessagePage} />
        <Route exact path="/u/setting" component={SettingPage} />
        <Route exact path={`/u/profile/:userID`} component={ProfilePage} />
        <Route
          path="*"
          component={() => {
            return (
              <div className="page404_User_Page">
                <Page404 />
              </div>
            );
          }}
        />
      </Switch>
    </>
  );
};

const LoadingScreen = () => {
  return (
    <>
      <div className="LoadingScreen_Page_Container">
        <h1 className="LoadingScreen_Title">Welcome To Social</h1>
        <div className="LoadingScreen_Container">
          <img className="LoadingScreen_App_Icon" src={AppIcon} />
          <div className="LoadingScreen_Loading_Div">
            <div className="LoadingScreen_Loading_Left_Part"></div>
            <div className="LoadingScreen_Loading_Right_Part"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const Index = () => {
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [renderMainPage, setRenderMainPage] = useState(false);
  useEffect(() => {
    // fetching all user data and current user following user Post data
    const getUserData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        });
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
          dispatch(userStoriesAction(userData.userStories));
          dispatch(messageListAction(userData.userProfileDetail.messages));
          setRenderMainPage(true);
        }
        socket.on("connect", () => {
          console.log(`connected to id: ${socket.id}`);
        });
      } catch (err) {
        console.log(err);
        history.push("/signin");
      }
    };
    getUserData();
  }, []);
  const ReturnMainPage = () => {
    return (
      <>
        {commentBoxStore.openCommentBox ? <CommentBox /> : <></>}
        <MainPageSideBar />
        <MainPageStory />
        <RoutingMainPage />
        <MainPageMsgAndNtfBar />
        <MainPageRightSideComp />
      </>
    );
  };
  return (
    <>
      <div className="MainPage_Container">
        {renderMainPage ? <ReturnMainPage /> : <LoadingScreen />}
      </div>
    </>
  );
};

export default Index;
