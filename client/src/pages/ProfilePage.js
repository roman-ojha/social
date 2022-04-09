import React, { useEffect, useState } from "react";
import UserPostFeed from "../react-components/UserPostFeed";
import { useSelector, useDispatch } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import { instance as axios } from "../services/axios";
import {
  mainPageMessageViewOnOff,
  mainPageMessageInnerViewOnOff,
  currentUserMessageAction,
  profilePageDataAction,
} from "../redux-actions/index";
import socket from "../services/socket";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "../styles/pages/profilePage.css";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet";
import CommentBox from "../react-components/CommentBox";
import { Switch, Route } from "react-router-dom";
import ProfileFriends from "../react-components/ProfileFriends";
import ProfileAlbums from "../react-components/ProfileAlbums";

const ProfilePage = () => {
  const history = useHistory();
  const params = useParams();
  const [fetchedAllData, setFetchedAllData] = useState(false);
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const openCommentBoxStore = useSelector(
    (state) => state.openCommentBoxReducer
  );
  const dispatch = useDispatch();
  const profilePageMainInformation = {
    // store searched user essintal information
    name: profilePageData.name,
    email: profilePageData.email,
    picture: profilePageData.picture,
    userID: profilePageData.userID,
  };
  const profilePageUserFeed = profilePageData.posts;
  const followUser = async () => {
    // writing logic for followuser
    try {
      const followedTo = {
        email: profilePageData.email,
        userID: profilePageData.userID,
        picture: profilePageData.picture,
        name: profilePageData.name,
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
        dispatch(profilePageDataAction(userObj));
      }
    } catch (err) {}
  };
  const unFollowUser = async () => {
    try {
      const unfollowedTo = {
        email: profilePageData.email,
        userID: profilePageData.userID,
        picture: profilePageData.picture,
        name: profilePageData.name,
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
      if (data.success) {
        dispatch(profilePageDataAction(userObj));
      }
    } catch (err) {}
  };
  const showInnerMessage = async () => {
    // before getting new message we will reset the previous message stored into redux
    try {
      dispatch(mainPageMessageViewOnOff(true));
      dispatch(
        currentUserMessageAction({
          messageTo: profilePageData.userID,
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
        data: JSON.stringify({ userID: profilePageData.userID }),
        withCredentials: true,
      });
      if (resMessage.status !== 200) {
        const error = await resMessage.data;
      } else {
        const message = await resMessage.data;
        // after getting message we will store that message into redux
        dispatch(currentUserMessageAction(message));
        // if we are inside the user message then we have to join room through socket
        // NOTE: this is just for temporary purposes
        socket.emit("join-room", message.roomID, (resMessage) => {
          console.log(resMessage);
        });
      }
    } catch (err) {}
  };
  useEffect(async () => {
    if (params.userID === userProfileDetailStore.userID) {
      dispatch(profilePageDataAction(userProfileDetailStore));
      setFetchedAllData(true);
    } else {
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
      } catch (err) {}
    }
  });
  return (
    <>
      {openCommentBoxStore ? <CommentBox /> : <></>}
      {fetchedAllData ? (
        <div className="ProfilePage_Container">
          <Helmet>
            <title>{params.userID}</title>
          </Helmet>
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
                <div
                  className="ProfilePage_UserInfo_Message_Icon_Container"
                  onClick={showInnerMessage}
                >
                  <Icon
                    className="ProfilePage_UserInfo_Message_Icon"
                    icon="ant-design:message-filled"
                  />
                </div>
              </div>
              <div className="ProfilePage_UserInfo_User_follow_Detail_Container">
                <p>{profilePageData.followersNo} Followers</p>
                <p>{profilePageData.followingNo} Following</p>
                <p>{profilePageData.postNo} Post</p>
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
            <div
              className="ProfilePage_UserContent_Feed_Route_Container"
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}`);
              }}
            >
              <span
                className="ProfilePage_UserContent_Feed_Icon iconify"
                data-icon="gg:feed"
              ></span>
            </div>
            <div
              className="ProfilePage_UserContent_Picture_Route_Container"
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/albums`);
              }}
            >
              <span
                className="ProfilePage_UserContent_Picture_Icon iconify"
                data-icon="akar-icons:image"
              ></span>
            </div>
            <div
              className="ProfilePage_UserContent_Friends_Route_Container"
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/friends`);
              }}
            >
              <span
                className="ProfilePage_UserContent_Friends_Icon iconify"
                data-icon="fa-solid:user-friends"
              ></span>
            </div>
          </div>
          <div className="ProfilePage_UserContent_Divider_Line"></div>
          <div className="ProfilePage_UserContent_Container">
            <Switch>
              <Route
                exact
                path="/u/profile/:userID"
                component={() => {
                  return (
                    <>
                      {profilePageUserFeed.map((value, index) => (
                        <UserPostFeed
                          userMainInformation={profilePageMainInformation}
                          userFeedData={value}
                          key={index}
                        />
                      ))}
                    </>
                  );
                }}
              />
              <Route
                exact
                path="/u/profile/:userID/albums"
                component={() => {
                  return (
                    <div className="ProfilePage_Albums_Container">
                      {profilePageUserFeed.map((value, index) => (
                        <ProfileAlbums
                          userMainInformation={profilePageMainInformation}
                          userFeedData={value}
                          key={index}
                        />
                      ))}
                    </div>
                  );
                }}
              />
              <Route
                exact
                path="/u/profile/:userID/friends"
                component={ProfileFriends}
              />
            </Switch>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProfilePage;
