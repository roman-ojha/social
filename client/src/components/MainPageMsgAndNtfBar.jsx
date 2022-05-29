import React from "react";
import more_icon from "../assets/svg/more_icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
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
} from "../services/redux-actions";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/mainPageMsgAndNtfBar.css";
import { Icon } from "@iconify/react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { toastError } from "../services/toast";
import messageApi from "../services/api/global/message";
import Api from "../services/api/components/MainPageMsgAndNtfBar";
import constant from "../constant/constant";
import { useMediaQuery } from "react-responsive";

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
  const moreProfileBoxState = useSelector(
    (state) => state.moreProfileBoxReducer
  );
  const notificationBoxState = useSelector((state) => state.notificationBox);
  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });

  const getNotificationData = async () => {
    dispatch(startProgressBar());
    try {
      const res = await Api.getNotificationData();
      const data = await res.data;
      if (res.status === 200 && data.success) {
        // success
        dispatch(setNotificationData(data.data));
      } else {
        // error
        toastError(data.msg);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
    dispatch(stopProgressBar());
    dispatch(openNotificationBox(true));
  };

  const getUserMessages = async () => {
    try {
      dispatch(startProgressBar());
      const resMessage = await messageApi.getUserMessages();
      const resMessageData = await resMessage.data;
      if (resMessage.status === 200 && resMessageData.success) {
        dispatch(messageListAction(resMessageData.messages));
        dispatch(mainPageMessageViewOnOff(!mainPageMessageOnOffState));
        dispatch(openNotificationBox(false));
        dispatch(openMoreProfileBox(false));
      } else {
        toastError("Error While fetching Messages");
      }
      dispatch(stopProgressBar());
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
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
                  dispatch(
                    mainPageMessageViewOnOff(!mainPageMessageOnOffState)
                  );
                  dispatch(openNotificationBox(false));
                  dispatch(openMoreProfileBox(false));
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
                  dispatch(
                    mainPageMessageViewOnOff(!mainPageMessageOnOffState)
                  );
                  dispatch(openNotificationBox(false));
                  dispatch(openMoreProfileBox(false));
                }
              }}
            />
          </div>
        )}
        <div
          className="MainPage_Message_Bar_Notification_Outline"
          onClick={() => {
            if (notificationBoxState.open) {
              dispatch(openNotificationBox(false));
            } else if (
              notificationBoxState.open === false &&
              notificationBoxState.notificationData.length === 0
            ) {
              getNotificationData();
            } else {
              dispatch(openNotificationBox(true));
            }
            dispatch(mainPageMessageViewOnOff(false));
            dispatch(openMoreProfileBox(false));
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
            dispatch(openMoreProfileBox(!moreProfileBoxState));
            dispatch(mainPageMessageViewOnOff(false));
            dispatch(openNotificationBox(false));
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
            dispatch(profilePageDataAction(userObj));
            if (!rootUserProfileDataState.fetchedRootUserProfileData) {
              dispatch(
                setRootUserProfileDataState({
                  fetchedRootUserProfileData: false,
                  getRootUserProfileData: true,
                })
              );
            }
            if (isMax850px) {
              dispatch(openRightPartDrawer(false));
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
