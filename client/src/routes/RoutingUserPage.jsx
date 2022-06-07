import React, { useEffect } from "react";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Message from "../pages/Message";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";
import Page404 from "../pages/Page404";
import Stories from "../pages/Stories";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const RoutingUserPage = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === "/u/profile") {
      history.push(`/u/profile/${userProfileDetailStore.userID}`);
    }
  }, [history, location.pathname, userProfileDetailStore.userID]);
  return (
    <div>
      <Switch>
        <Route exact path="/u/home" component={Home} />
        <Route exact path="/u/video" component={Video} />
        <Route exact path="/u/message" component={Message} />
        <Route exact path="/u/setting" component={Setting} />
        <Route path="/u/profile/:userID" component={Profile} />
        <Route exact page="/u/stories" component={Stories} />
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

export default RoutingUserPage;
