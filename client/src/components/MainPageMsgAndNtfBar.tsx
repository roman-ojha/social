import React from "react";
import more_icon from "../assets/svg/more_icon.svg";
import { useSelector, useDispatch } from "react-redux";
// import {
//   mainPageMessageViewOnOff,
//   openNotificationBox,
//   openMoreProfileBox,
//   startProgressBar,
//   stopProgressBar,
//   setNotificationData,
//   messageListAction,
//   setRootUserProfileDataState,
//   profilePageDataAction,
//   openRightPartDrawer,
// } from "../services/redux-actions";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/mainPageMsgAndNtfBar.css";
import { Icon } from "@iconify/react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { toastError } from "../services/toast";
import messageApi from "../services/api/global/message";
import Api from "../services/api/components/MainPageMsgAndNtfBar";
import constant from "../constant/constant";
import { useMediaQuery } from "react-responsive";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../services/redux";
import { AxiosError } from "axios";

const MainPageMsgAndNtfBar = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const mainPageMessageOnOffState = useSelector(
    (state: AppState) => state.changeMainPageMessageView
  );
  const moreProfileBoxState = useSelector(
    (state: AppState) => state.moreProfileBoxReducer
  );
  const notificationBoxState = useSelector(
    (state: AppState) => state.notificationBox
  );
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });

  const {
    mainPageMessageViewOnOff,
    openNotificationBox,
    openMoreProfileBox,
    startProgressBar,
    stopProgressBar,
    setNotificationData,
    messageListAction,
    setRootUserProfileDataState,
    profilePageDataAction,
    openRightPartDrawer,
  } = bindActionCreators(actionCreators, dispatch);

  const getNotificationData = async () => {
    startProgressBar();
    try {
      const res = await Api.getNotificationData();
      const data = await res.data;
      if (res.status === 200 && data.success) {
        // success
        setNotificationData(data.data);
      } else {
        // error
        toastError(data.msg);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
    stopProgressBar();
    openNotificationBox(true);
  };

  const getUserMessages = async () => {
    try {
      startProgressBar();
      const resMessage = await messageApi.getUserMessages();
      const resMessageData = await resMessage.data;
      if (resMessage.status === 200 && resMessageData.success) {
        messageListAction(resMessageData.messages);
        mainPageMessageViewOnOff(!mainPageMessageOnOffState);
        openNotificationBox(false);
        openMoreProfileBox(false);
      } else {
        toastError("Error While fetching Messages");
      }
      stopProgressBar();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      stopProgressBar();
    }
  };

  return (
    <>
      <section className="MainPage_Message_and_Notification_Bar_Container">
        {location.pathname === "/u/message" ? (
          <NavLink
            to="/u/home"
            className="MainPage_Message_Bar_Message_Outline"
          >
            <Icon
              className="MainPage_Message_and_Notification_Bar_Icon"
              icon="ant-design:message-filled"
              onClick={() => {
                if (!mainPageMessageOnOffState) {
                  getUserMessages();
                } else {
                  mainPageMessageViewOnOff(!mainPageMessageOnOffState);
                  openNotificationBox(false);
                  openMoreProfileBox(false);
                }
              }}
            />
          </NavLink>
        ) : (
          <div className="MainPage_Message_Bar_Message_Outline">
            <Icon
              className="MainPage_Message_and_Notification_Bar_Icon"
              icon="ant-design:message-filled"
              onClick={() => {
                if (!mainPageMessageOnOffState) {
                  getUserMessages();
                } else {
                  mainPageMessageViewOnOff(!mainPageMessageOnOffState);
                  openNotificationBox(false);
                  openMoreProfileBox(false);
                }
              }}
            />
          </div>
        )}
        <div
          className="MainPage_Message_Bar_Notification_Outline"
          onClick={() => {
            if (notificationBoxState.open) {
              openNotificationBox(false);
            } else if (
              notificationBoxState.open === false &&
              notificationBoxState.notificationData.length === 0
            ) {
              getNotificationData();
            } else {
              openNotificationBox(true);
            }
            mainPageMessageViewOnOff(false);
            openMoreProfileBox(false);
          }}
        >
          <Icon
            className="MainPage_Message_and_Notification_Bar_Icon"
            icon="carbon:notification-new"
          />
        </div>
        <div
          className="MainPage_Message_Bar_More_Outline"
          onClick={() => {
            openMoreProfileBox(!moreProfileBoxState);
            mainPageMessageViewOnOff(false);
            openNotificationBox(false);
          }}
        >
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
            if (isMax850px) {
              openRightPartDrawer(false);
            }
            history.push(`/u/profile/${userProfileDetailStore.userID}/posts`);
          }}
          alt="profile"
        />
      </section>
    </>
  );
};

export default MainPageMsgAndNtfBar;
