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
  startProgressBar,
  stopProgressBar,
} from "../redux-actions/index";
import socket from "../services/socket";
import {
  useLocation,
  Switch,
  Route,
  useHistory,
  useParams,
} from "react-router-dom";
import "../styles/pages/profilePage.css";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet";
import CommentBox from "../react-components/CommentBox";
import ProfileFriends from "../react-components/ProfileFriends";
import ProfileAlbums from "../react-components/ProfileAlbums";
import OpenSideBarDrawerButton from "../react-components/OpenSideBarDrawerButton";
import { toast } from "react-toastify";

const ProfilePage = () => {
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
      dispatch(startProgressBar());
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
        dispatch(stopProgressBar());
      }
    } catch (err) {
      dispatch(stopProgressBar());
    }
  };

  const unFollowUser = async () => {
    try {
      dispatch(startProgressBar());
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
      if (response.status === 200 && data.success === true) {
        dispatch(profilePageDataAction(userObj));
        dispatch(stopProgressBar());
        toast.success(data.msg, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toast.error(err.response.data.err, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      } else {
        toast.error("Some Problem Occur, Please Try again Letter!!!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
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
    } catch (err) {
      if (err.response.data.success === false) {
        toast.error(err.response.data.err, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      } else {
        toast.error("Some Problem Occur, Please Try again Letter!!!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
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
      } else if (location.pathname.includes("/friends")) {
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
          toast.error(err.response.data.err, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
          });
        } else {
          toast.error("Some Problem Occur, Please Try again Letter!!!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
          });
        }
        history.push("/u");
      }
    } else {
      setFetchedAllData(true);
    }
  }, []);
  useEffect(() => {
    fillColorOnRoute();
  });

  return (
    <>
      {openCommentBoxStore ? <CommentBox /> : <></>}
      {fetchedAllData ? (
        <div className="ProfilePage_Container">
          <Helmet>
            <title>{params.userID}</title>
          </Helmet>
          <OpenSideBarDrawerButton />
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
              className="ProfilePage_UserContent_Feed_Route_Container ProfilePage_Route"
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}`);
              }}
            >
              <span
                className="ProfilePage_UserContent_Icon iconify"
                data-icon="gg:feed"
              ></span>
            </div>
            <div
              className="ProfilePage_UserContent_Picture_Route_Container ProfilePage_Route"
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/albums`);
              }}
            >
              <span
                className="ProfilePage_UserContent_Icon iconify"
                data-icon="akar-icons:image"
              ></span>
            </div>
            <div
              className="ProfilePage_UserContent_Friends_Route_Container ProfilePage_Route"
              onClick={() => {
                history.push(`/u/profile/${profilePageData.userID}/friends`);
              }}
            >
              <span
                className="ProfilePage_UserContent_Icon iconify"
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
                component={ProfileAlbums}
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
        <></>
      )}
    </>
  );
};

export default ProfilePage;
