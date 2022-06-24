import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProfileFriends from "../components/ProfileFriends";
import ProfileAlbums from "../components/ProfileAlbums";
import { useLocation } from "react-router-dom";
import UserPosts from "../components/ProfilePage/UserPosts";

const RoutingProfilePage = (props) => {
  const location = useLocation();

  useEffect(() => {
    const colorSelectedUrl = () => {
      // updating color of sidebar tab through useEffect
      try {
        if (location.pathname.includes("/u/profile")) {
          const selectedLinkElement = document.getElementsByClassName(
            "MainPage_SideBar_Link"
          )[4] as HTMLElement;
          (
            selectedLinkElement.firstElementChild! as HTMLElement
          ).style.backgroundColor = "var(--primary-color-point-7)";
          (
            document.getElementsByClassName(
              "MainPage_SideBar_Menu_Logo"
            )[4] as HTMLElement
          ).style.color = "var(--primary-color-point-7)";
          (
            selectedLinkElement.firstElementChild!.nextElementSibling!
              .nextElementSibling! as HTMLElement
          ).style.color = "var(--primary-color-point-7)";
        }
      } catch (err) {}
    };
    colorSelectedUrl();
    return () => {
      try {
        if (location.pathname.includes("/u/profile")) {
          const selectedLinkElement = document.getElementsByClassName(
            "MainPage_SideBar_Link"
          )[4];
          (
            selectedLinkElement.firstElementChild! as HTMLElement
          ).style.backgroundColor = "transparent";
          (
            document.getElementsByClassName(
              "MainPage_SideBar_Menu_Logo"
            )[4] as HTMLElement
          ).style.color = "var(--lower-opacity-font-color)";
          (
            selectedLinkElement.firstElementChild!.nextElementSibling!
              .nextElementSibling! as HTMLElement
          ).style.color = "var(--lower-opacity-font-color)";
        }
      } catch (err) {}
    };
  }, [location.pathname]);
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/u/profile/:userID/posts"
          component={() => {
            return (
              <>
                <UserPosts profilePageData={props.profilePageData} />
              </>
            );
          }}
        />
        <Route
          exact
          path="/u/profile/:userID/albums"
          component={() => {
            return (
              <>
                <ProfileAlbums profilePageData={props.profilePageData} />
              </>
            );
          }}
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
