import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const PageRoute = () => {
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  return (
    <>
      <div className="ProfilePage_UserContent_Route_Container">
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
      </div>
      <div className="ProfilePage_UserContent_Divider_Line"></div>
    </>
  );
};

export default PageRoute;
