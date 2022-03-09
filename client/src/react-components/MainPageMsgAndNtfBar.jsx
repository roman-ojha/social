import React from "react";
import mainPage_sideBar_message from "../Images/mainPage_sideBar_message.svg";
import more_icon from "../Images/more_icon.svg";
import notification_icon from "../Images/notification_icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { mainPageMessageViewOnOff } from "../redux-actions/index";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import "../styles/react-components/mainPageMsgAndNtfBar.css";

const MainPageMsgAndNtfBar = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const messageOnOffDispatch = useDispatch();
  return (
    <>
      <div className="MainPage_Message_and_Notification_Bar_Container">
        <div className="MainPage_Message_Bar_Message_Outline">
          <img
            src={mainPage_sideBar_message}
            alt="message"
            onClick={() => {
              messageOnOffDispatch(
                mainPageMessageViewOnOff(!mainPageMessageOnOffState)
              );
            }}
          />
        </div>
        <div className="MainPage_Message_Bar_Notification_Outline">
          <img src={notification_icon} alt="notification" />
        </div>
        <div className="MainPage_Message_Bar_More_Outline">
          <img src={more_icon} alt="more" />
        </div>
        <img
          className="MainPage_Message_Bar_Profile"
          src={
            userProfileDetailStore.picture === undefined
              ? User_Profile_Icon
              : userProfileDetailStore.picture
          }
          alt="profile"
        />
      </div>
    </>
  );
};

export default MainPageMsgAndNtfBar;
