import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
// import {
//   mainPageMessageViewOnOff,
//   mainPageMessageInnerViewOnOff,
//   currentUserMessageAction,
//   startProgressBar,
//   stopProgressBar,
//   profilePageDataAction,
// } from "../../services/redux-actions";
import { instance as axios } from "../../services/axios";
import { toastError, toastSuccess } from "../../services/toast";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import constant from "../../constant/constant";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../services/redux";
import { AxiosError } from "axios";

const UserInfo = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profilePageData = useSelector(
    (state: AppState) => state.profilePageDataReducer
  );
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });
  const {
    mainPageMessageViewOnOff,
    mainPageMessageInnerViewOnOff,
    currentUserMessageAction,
    startProgressBar,
    stopProgressBar,
    profilePageDataAction,
  } = bindActionCreators(actionCreators, dispatch);

  const followUser = async (): Promise<void> => {
    // writing logic for followuser
    try {
      startProgressBar();
      const followedTo = {
        userID: profilePageData.userID,
        id: profilePageData.id,
      };
      const response = await axios({
        method: "POST",
        url: "/u/follow",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(followedTo),
        // sending both follwedTo and FollowedBy
        withCredentials: true,
      });
      const data = await response.data;
      const userObj = {
        ...profilePageData,
        isRootUserFollowed: true,
      };
      if (data.success) {
      }
      if (response.status === 200 && data.success) {
        toastSuccess(data.msg);
        profilePageDataAction(userObj);
        stopProgressBar();
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
      stopProgressBar();
    }
  };

  const unFollowUser = async (): Promise<void> => {
    try {
      startProgressBar();
      const unfollowedTo = {
        userID: profilePageData.userID,
        id: profilePageData.id,
      };
      const response = await axios({
        method: "POST",
        url: "/u/unfollow",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(unfollowedTo),
        // sending both follwedTo and FollowedBy
        withCredentials: true,
      });
      const data = await response.data;
      const userObj = {
        ...profilePageData,
        isRootUserFollowed: false,
      };
      if (response.status === 200 && data.success) {
        toastSuccess(data.msg);
        profilePageDataAction(userObj);
        stopProgressBar();
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
      stopProgressBar();
    }
  };

  const showInnerMessage = async (): Promise<void> => {
    // before getting new message we will reset the previous message stored into redux
    try {
      if (isMax850px) {
        history.push("/u/message");
      } else {
        mainPageMessageViewOnOff(true);
      }
      currentUserMessageAction({
        messageToId: profilePageData.id,
        messageToUserId: profilePageData.userID,
        receiverPicture: profilePageData.picture,
        message: [],
      });
      mainPageMessageInnerViewOnOff(true);
      const resMessage = await axios({
        // sending receiver userID to get message data of that user
        method: "POST",
        url: "/u/getMessage",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userID: profilePageData.userID,
          id: profilePageData.id,
        }),
        withCredentials: true,
      });
      if (resMessage.status !== 200) {
        // const error = await resMessage.data;
      } else {
        const resData = await resMessage.data.data;
        // after getting message we will store that message into redux
        currentUserMessageAction({
          messageToId: resData.messageToId,
          messageToUserId: profilePageData.userID,
          receiverPicture: profilePageData.picture,
          // roomID: resData.roomID,
          message: resData.message,
          fetchedInnerMessage: true,
        });
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
  };

  return (
    <>
      <div className="ProfilePage_UserInfo_Container">
        <div className="ProfilePage_UserInfo_Picture_Container">
          <img
            src={
              profilePageData.picture === undefined
                ? User_Profile_Icon
                : profilePageData.picture
            }
            alt="profile"
          />
        </div>
        <div className="ProfilePage_UserInfo_Detail_Container">
          <div className="ProfilePage_UserInfo_UserName_Msg_Container">
            <div className="ProfilePage_UserInfo_UserName_Container">
              <h1>{profilePageData.name}</h1>
              <p>{profilePageData.userID}</p>
            </div>
            {profilePageData.userID === userProfileDetailStore.userID ? (
              <></>
            ) : (
              <div
                className="ProfilePage_UserInfo_Message_Icon_Container"
                onClick={showInnerMessage}
              >
                <Icon
                  className="ProfilePage_UserInfo_Message_Icon"
                  icon="ant-design:message-filled"
                />
              </div>
            )}
          </div>
          <div className="ProfilePage_UserInfo_User_follow_Detail_Container">
            <p
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/followers`);
              }}
            >
              {profilePageData.followersNo} Followers
            </p>
            <p
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/followings`);
              }}
            >
              {profilePageData.followingNo} Following
            </p>
            <p
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/posts`);
              }}
            >
              {profilePageData.postNo} Post
            </p>
          </div>
        </div>
        <div className="ProfilePage_UserInfo_Follow_and_More_Button_Container">
          <div className="ProfilePage_UserInfo_More_Icon_Container">
            <Icon className="ProfilePage_UserInfo_More_Icon" icon="ep:more" />
          </div>
          {profilePageData.userID === userProfileDetailStore.userID ? (
            // if profilePage is of root user then we don't have to show follow & unfollow button
            ""
          ) : profilePageData.isRootUserFollowed ? (
            <button
              className="ProfilePage_UserInfo_FollowUser_Button"
              onClick={unFollowUser}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="ProfilePage_UserInfo_FollowUser_Button"
              onClick={followUser}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
