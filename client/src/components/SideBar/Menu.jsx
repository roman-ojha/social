import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import {
  profilePageDataAction,
  setRootUserProfileDataState,
} from "../../services/redux-actions";

const Menu = () => {
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );

  return (
    <>
      <nav className="MainPage_SideBar_Menu_Container">
        <h2 className="MainPage_SideBar_Menu_Title">Menu</h2>
        <div className="MainPage_SideBar_Menu_NavLink_Container">
          <NavLink
            to="/u/home"
            className="MainPage_SideBar_Menu_Home_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="ant-design:home-filled"
            />
            <h3 className="MainPage_SideBar_Menu_Home_Title">Home</h3>
          </NavLink>
          <NavLink
            to="/u/video"
            className="MainPage_SideBar_Menu_Video_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="clarity:video-gallery-solid"
            />
            <h3 className="MainPage_SideBar_Menu_Video_Title">Video</h3>
          </NavLink>
          <NavLink
            to="/u/message"
            className="MainPage_SideBar_Menu_Message_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="ant-design:message-filled"
            />
            <h3 className="MainPage_SideBar_Menu_Message_Title">Message</h3>
          </NavLink>
          <NavLink
            to="/u/setting"
            className="MainPage_SideBar_Menu_Setting_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="ant-design:setting-filled"
            />
            <h3 className="MainPage_SideBar_Menu_Setting_Title">Setting</h3>
          </NavLink>
          <NavLink
            to={`/u/profile/${userProfileDetailStore.userID}/posts`}
            className="MainPage_SideBar_Menu_Profile_Container MainPage_SideBar_Link"
            onClick={() => {
              const userObj = {
                ...userProfileDetailStore,
                isRootUserFollowed: false,
              };
              dispatch(profilePageDataAction(userObj));
              if (!rootUserProfileDataState.fetchedRootUserProfileData) {
                dispatch(
                  setRootUserProfileDataState({
                    fetchedRootUserProfileData: false,
                    getRootUserProfileData: true,
                  })
                );
              }
            }}
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="gg:profile"
            />
            <h3 className="MainPage_SideBar_Menu_Profile_Title">Profile</h3>
          </NavLink>
        </div>
        <hr className="MainPage_SideBar_Horizontal_Line" />
      </nav>
    </>
  );
};

export default Menu;
