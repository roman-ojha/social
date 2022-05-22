import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProfileFriends from "../components/ProfileFriends";
import ProfileAlbums from "../components/ProfileAlbums";
import { useLocation } from "react-router-dom";
import UserPosts from "../components/ProfilePage/UserPosts";

const RoutingProfilePage = () => {
  const location = useLocation();
  const colorSelectedUrl = () => {
    // updating color of sidebar tab through useEffect
    try {
      if (location.pathname.includes("/u/profile")) {
        const selectedLinkElement = document.getElementsByClassName(
          "MainPage_SideBar_Link"
        )[4];
        selectedLinkElement.firstElementChild.style.backgroundColor =
          "var(--primary-color-point-7)";
        document.getElementsByClassName(
          "MainPage_SideBar_Menu_Logo"
        )[4].style.color = "var(--primary-color-point-7)";
        selectedLinkElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
          "var(--primary-color-point-7)";
      }
    } catch (err) {}
  };
  useEffect(() => {
    colorSelectedUrl();
    return () => {
      try {
        if (location.pathname.includes("/u/profile")) {
          const selectedLinkElement = document.getElementsByClassName(
            "MainPage_SideBar_Link"
          )[4];
          selectedLinkElement.firstElementChild.style.backgroundColor =
            "transparent";
          document.getElementsByClassName(
            "MainPage_SideBar_Menu_Logo"
          )[4].style.color = "var(--lower-opacity-font-color)";
          selectedLinkElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
            "var(--lower-opacity-font-color)";
        }
      } catch (err) {}
    };
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path="/u/profile/:userID/posts" component={UserPosts} />
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
