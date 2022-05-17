import React from "react";
import { Switch, Route } from "react-router-dom";
import ProfileFriends from "../components/ProfileFriends";
import ProfileAlbums from "../components/ProfileAlbums";
import UserPostFeed from "../components/UserPostFeed";

const RoutingProfilePage = (props) => {
  return (
    <div>
      <Switch>
        <Route
          path="/u/profile/:userID/posts"
          component={() => {
            return (
              <>
                {props.profilePageUserFeed.map((value, index) => (
                  <UserPostFeed
                    userMainInformation={props.profilePageMainInformation}
                    userFeedData={value}
                    key={index}
                  />
                ))}
              </>
            );
          }}
        />
        <Route
          exact
          path="/u/profile/:userID/albums"
          component={ProfileAlbums}
        />
        <Route
          exact
          path="/u/profile/:userID/friends"
          component={ProfileFriends}
        />
        <Route
          exact
          path="/u/profile/:userID/followers"
          component={ProfileFriends}
        />
        <Route
          exact
          path="/u/profile/:userID/followings"
          component={ProfileFriends}
        />
      </Switch>
    </div>
  );
};

export default RoutingProfilePage;
