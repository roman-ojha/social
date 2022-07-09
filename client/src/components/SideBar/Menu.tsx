import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../services/redux";
import { Button } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { makeStyles } from "@mui/styles";
import useRootUserProfilePageData from "../../hooks/useRootUserProfilePageData";

const buttonStyle = makeStyles({
  root: {},
  buttonRipple: { color: "var(--primary-color-opacity-3)" },
});

const Menu = (): JSX.Element => {
  const ButtonClass = buttonStyle();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const setRootUserProfilePageData = useRootUserProfilePageData();

  return (
    <>
      <nav className="MainPage_SideBar_Menu_Container">
        <h2 className="MainPage_SideBar_Menu_Title">Menu</h2>
        <div className="MainPage_SideBar_Menu_NavLink_Container">
          <Button
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
            id="MainPage_SideBar_Menu_MUI_Button"
          >
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
          </Button>
          <Button
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
            id="MainPage_SideBar_Menu_MUI_Button"
          >
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
          </Button>
          <Button
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
            id="MainPage_SideBar_Menu_MUI_Button"
          >
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
          </Button>
          <Button
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
            id="MainPage_SideBar_Menu_MUI_Button"
          >
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
          </Button>
          <Button
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
            id="MainPage_SideBar_Menu_MUI_Button"
          >
            <NavLink
              to={`/u/profile/${userProfileDetailStore.userID}/posts`}
              className="MainPage_SideBar_Menu_Profile_Container MainPage_SideBar_Link"
              onClick={() => {
                setRootUserProfilePageData({
                  rootUserProfileDetail: userProfileDetailStore,
                });
              }}
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <Icon
                className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
                icon="gg:profile"
              />
              <h3 className="MainPage_SideBar_Menu_Profile_Title">Profile</h3>
            </NavLink>
          </Button>
        </div>
        <hr className="MainPage_SideBar_Horizontal_Line" />
      </nav>
    </>
  );
};

export default Menu;
