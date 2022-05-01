import React from "react";
import more_icon from "../assets/Images/more_icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  mainPageMessageViewOnOff,
  openNotificationBox,
} from "../redux-actions";
import User_Profile_Icon from "../assets/Images/User_profile_Icon.svg";
import "../styles/react-components/mainPageMsgAndNtfBar.css";
import { Icon } from "@iconify/react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

const MainPageMsgAndNtfBar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector((state) => state.notificationBox);
  return (
    <>
      <div className="MainPage_Message_and_Notification_Bar_Container">
        {location.pathname === "/u/message" ? (
          <NavLink to="/u" className="MainPage_Message_Bar_Message_Outline">
            <Icon
              className="MainPage_Message_and_Notification_Bar_Icon"
              icon="ant-design:message-filled"
              onClick={() => {
                dispatch(mainPageMessageViewOnOff(!mainPageMessageOnOffState));
                dispatch(openNotificationBox(false));
              }}
            />
          </NavLink>
        ) : (
          <div className="MainPage_Message_Bar_Message_Outline">
            {" "}
            <Icon
              className="MainPage_Message_and_Notification_Bar_Icon"
              icon="ant-design:message-filled"
              onClick={() => {
                dispatch(mainPageMessageViewOnOff(!mainPageMessageOnOffState));
                dispatch(openNotificationBox(false));
              }}
            />
          </div>
        )}
        <div className="MainPage_Message_Bar_Notification_Outline">
          <Icon
            className="MainPage_Message_and_Notification_Bar_Icon"
            icon="carbon:notification-new"
            onClick={() => {
              dispatch(openNotificationBox(!notificationBoxState));
              dispatch(mainPageMessageViewOnOff(false));
            }}
          />
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
          onClick={() => {
            history.push(`/u/profile/${userProfileDetailStore.userID}`);
          }}
          alt="profile"
        />
      </div>
    </>
  );
};

export default MainPageMsgAndNtfBar;
