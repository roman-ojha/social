import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
// import {
//   profilePageDataAction,
//   setRootUserProfileDataState,
// } from "../../services/redux-actions";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { Button } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import { MUICustomStyles } from "../../interface/MUI";

const styles: MUICustomStyles = (theme: Theme) => ({
  button: {
    // "&:hover": {
    //   backgroundColor: "red",
    // },
  },
  child: {
    backgroundColor: "var(--primary-color-opacity-3)",
  },
  rippleVisible: {
    opacity: 0.5,
    animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes enter": {
    "0%": {
      transform: "scale(0)",
      opacity: 0.1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0.5,
    },
  },
});

const Menu = ({ classes, ...other }): JSX.Element => {
  const { button: buttonClass, ...rippleClasses } = classes;
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const { profilePageDataAction, setRootUserProfileDataState } =
    bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <nav className="MainPage_SideBar_Menu_Container">
        <h2 className="MainPage_SideBar_Menu_Title">Menu</h2>
        <div className="MainPage_SideBar_Menu_NavLink_Container">
          <Button
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
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
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
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
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
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
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
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
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
            id="MainPage_SideBar_Menu_MUI_Button"
          >
            <NavLink
              to={`/u/profile/${userProfileDetailStore.userID}/posts`}
              className="MainPage_SideBar_Menu_Profile_Container MainPage_SideBar_Link"
              onClick={() => {
                const userObj = {
                  ...userProfileDetailStore,
                  isRootUserFollowed: false,
                };
                profilePageDataAction(userObj);
                if (!rootUserProfileDataState.fetchedRootUserProfileData) {
                  setRootUserProfileDataState({
                    fetchedRootUserProfileData: false,
                    getRootUserProfileData: true,
                  });
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
          </Button>
        </div>
        <hr className="MainPage_SideBar_Horizontal_Line" />
      </nav>
    </>
  );
};

export default withStyles(styles)(Menu);
