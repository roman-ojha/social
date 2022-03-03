import React, { useEffect, useState } from "react";
import MainPageSideBar from "./MainPageSideBar";
import MainPageStory from "./MainPageStory";
import MainPageMsgAndNtfBar from "./MainPageMsgAndNtfBar";
import MainPageRightSideComp from "./MainPageRightSideComp";
import HomePage from "./HomePage";
import VideoPage from "./VideoPage";
import MessagePage from "./MessagePage";
import SettingPage from "./SettingPage";
import ProfilePage from "./ProfilePage";
import SearchedProfilePage from "./SearchedProfilePage";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfileDetailAction,
  userProfilePostAction,
  followedUserPostDataAction,
} from "../redux-actions/index";
import { instance as axios } from "../services/axios";
import socket from "../services/socket";
const RoutingMainPage = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const searchUserProfileStore = useSelector(
    (state) => state.setSearchUserProfileReducer
  );
  return (
    <>
      <Switch>
        <Route exact path="/u" component={HomePage} />
        <Route exact path="/u/video" component={VideoPage} />
        <Route exact path="/u/message" component={MessagePage} />
        <Route exact path="/u/setting" component={SettingPage} />
        <Route
          exact
          path={`/u/profile/:userID`}
          component={SearchedProfilePage}
        />
      </Switch>
    </>
  );
};

const MainPage = () => {
  const userDataDispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userProfileDetailDispatch = useDispatch();
  const userProfilePostStore = useSelector(
    (state) => state.setUserProfilePostReducer
  );
  const history = useHistory();
  const [renderMainPage, setRenderMainPage] = useState(false);
  useEffect(() => {
    // fetching all user data and current user following user Post data
    const getUserData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/u",
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
        userDataDispatch(userProfileDetailAction(userData.userProfileDetail));
        userDataDispatch(
          userProfilePostAction(userData.userProfileDetail.posts)
        );
        userDataDispatch(followedUserPostDataAction(userData.followedUserPost));
        // console.log(userData);
        setRenderMainPage(true);
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
        {renderMainPage ? <ReturnMainPage /> : ""}
      </div>
    </>
  );
};

export default MainPage;
