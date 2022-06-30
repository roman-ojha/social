import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../services/redux";

const PageRoute = (): JSX.Element => {
  const profilePageData = useSelector(
    (state: AppState) => state.profilePageDataReducer
  );

  return (
    <>
      <nav className="ProfilePage_UserContent_Route_Container">
        <NavLink
          className="ProfilePage_UserContent_Feed_Route_Container ProfilePage_Route"
          to={`/u/profile/${profilePageData.userID}/posts`}
        >
          <Icon className="ProfilePage_UserContent_Icon" icon="gg:feed" />
        </NavLink>
        <NavLink
          className="ProfilePage_UserContent_Picture_Route_Container ProfilePage_Route"
          to={`/u/profile/${profilePageData.userID}/albums`}
        >
          <Icon
            className="ProfilePage_UserContent_Icon"
            icon="akar-icons:image"
          />
        </NavLink>
        <NavLink
          className="ProfilePage_UserContent_Friends_Route_Container ProfilePage_Route"
          to={`/u/profile/${profilePageData.userID}/friends`}
        >
          <Icon
            className="ProfilePage_UserContent_Icon iconify"
            icon="fa-solid:user-friends"
          />
        </NavLink>
      </nav>
      <div className="ProfilePage_UserContent_Divider_Line"></div>
    </>
  );
};

export default PageRoute;
