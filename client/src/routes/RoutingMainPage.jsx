import React from "react";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";
import MessagePage from "../pages/MessagePage";
import SettingPage from "../pages/SettingPage";
import ProfilePage from "../pages/ProfilePage";
import Page404 from "../pages/Page404";
import StoriesPage from "../pages/StoriesPage";
import { Switch, Route } from "react-router-dom";

const RoutingMainPage = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/u" component={HomePage} />
        <Route exact path="/u/video" component={VideoPage} />
        <Route exact path="/u/message" component={MessagePage} />
        <Route exact path="/u/setting" component={SettingPage} />
        <Route path="/u/profile/:userID" component={ProfilePage} />
        <Route exact page="/u/stories" component={StoriesPage} />
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
    </div>
  );
};

export default RoutingMainPage;
