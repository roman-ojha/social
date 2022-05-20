import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { instance as axios } from "../services/axios";
import {
  mainPageMessageViewOnOff,
  mainPageMessageInnerViewOnOff,
  currentUserMessageAction,
  profilePageDataAction,
  startProgressBar,
  stopProgressBar,
} from "../services/redux-actions/index";
import socket from "../services/socket";
import { useLocation, useHistory, useParams, NavLink } from "react-router-dom";
import "../styles/pages/profilePage.css";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet";
import CommentBox from "../components/CommentBox";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import { toastSuccess, toastError } from "../services/toast";
import RoutingProfilePage from "../routes/RoutingProfilePage";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";

const Profile = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const [fetchedAllData, setFetchedAllData] = useState(false);
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const openCommentBoxStore = useSelector(
    (state) => state.openCommentBoxReducer
  );
  const dispatch = useDispatch();
  const followUser = async () => {
    // writing logic for followuser
    try {
      dispatch(startProgressBar());
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
        dispatch(profilePageDataAction(userObj));
        dispatch(stopProgressBar());
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };

  const unFollowUser = async () => {
    try {
      dispatch(startProgressBar());
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
        dispatch(profilePageDataAction(userObj));
        dispatch(stopProgressBar());
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };

  const showInnerMessage = async () => {
    // before getting new message we will reset the previous message stored into redux
    try {
      dispatch(mainPageMessageViewOnOff(true));
      dispatch(
        currentUserMessageAction({
          messageToId: profilePageData.id,
          messageToUserId: profilePageData.userID,
          receiverPicture: profilePageData.picture,
          message: [],
        })
      );
      dispatch(mainPageMessageInnerViewOnOff(true));
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
        const error = await resMessage.data;
      } else {
        const resData = await resMessage.data;
        // after getting message we will store that message into redux
        dispatch(
          currentUserMessageAction({
            messageToId: resData.messageToId,
            messageToUserId: profilePageData.userID,
            receiverPicture: profilePageData.picture,
            roomID: resData.roomID,
            message: resData.message,
          })
        );
        // if we are inside the user message then we have to join room through socket
        // NOTE: this is just for temporary purposes
        socket.emit("join-room", resData.roomID, (resMessage) => {
          console.log(resMessage);
        });
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };

  const fillColorOnRoute = () => {
    try {
      let selectedRouteIndex;
      // console.log(location.pathname);
      if (location.pathname.includes("/albums")) {
        // console.log("albums");
        selectedRouteIndex = 1;
      } else if (
        location.pathname.includes("/friends") ||
        location.pathname.includes("/followers") ||
        location.pathname.includes("/followings")
      ) {
        selectedRouteIndex = 2;
      } else {
        selectedRouteIndex = 0;
      }
      document.getElementsByClassName("ProfilePage_Route")[
        selectedRouteIndex
      ].style.borderColor = "var(--primary-color-point-7)";

      document.getElementsByClassName("ProfilePage_UserContent_Icon")[
        selectedRouteIndex
      ].style.color = "var(--primary-color-point-7)";
    } catch (err) {}
  };

  useEffect(async () => {
    if (params.userID === userProfileDetailStore.userID) {
      dispatch(profilePageDataAction(userProfileDetailStore));
      setFetchedAllData(true);
    } else if (profilePageData.userID != params.userID) {
      try {
        // fetching user Detail which current user had search
        const res = await axios({
          method: "GET",
          url: `/u/profile/${params.userID}`,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const userData = await res.data;
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        dispatch(profilePageDataAction(userObj));
        setFetchedAllData(true);
      } catch (err) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
        history.push("/u");
      }
    } else {
      setFetchedAllData(true);
    }
    if (
      location.pathname.endsWith(params.userID) ||
      location.pathname.endsWith(`${params.userID}/`)
    ) {
      history.push(`/u/profile/${params.userID}/posts`);
    }
  }, []);

  return (
    <>
      {openCommentBoxStore ? <CommentBox /> : <></>}
      {fetchedAllData ? (
        <div className="ProfilePage_Container">
          <Helmet>
            <title>{params.userID}</title>
          </Helmet>
          <OpenSideBarDrawerButton />
          <OpenRightPartDrawerButton />
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
                    history.push(
                      `/u/profile/${profilePageData.userID}/followers`
                    );
                  }}
                >
                  {profilePageData.followersNo} Followers
                </p>
                <p
                  onClick={() => {
                    history.push(
                      `/u/profile/${profilePageData.userID}/followings`
                    );
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
                <Icon
                  className="ProfilePage_UserInfo_More_Icon"
                  icon="ep:more"
                />
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
          <div className="ProfilePage_UserContent_Container">
            <RoutingProfilePage
              profilePageMainInformation={{
                // store searched user essintal information
                name: profilePageData.name,
                email: profilePageData.email,
                picture: profilePageData.picture,
                userID: profilePageData.userID,
              }}
              profilePageUserFeed={profilePageData.posts}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
