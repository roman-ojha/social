import React from "react";
import mainPage_sideBar_message from "../Images/mainPage_sideBar_message.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserPostFeed from "./UserPostFeed";
import { useSelector, useDispatch } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import { instance as axios } from "../services/axios";
import {
  mainPageMessageViewOnOff,
  mainPageMessageInnerViewOnOff,
  currentUserMessageAction,
} from "../redux-actions/index";
import socket from "../services/socket";

const SearchedProfilePage = () => {
  const searchUserProfileStore = useSelector(
    (state) => state.setSearchUserProfileReducer
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  console.log(searchUserProfileStore);
  console.log(userProfileDetailStore);
  const dispatch = useDispatch();
  const searchedUserMainInformation = {
    // store searched user essintal information
    name: searchUserProfileStore.name,
    email: searchUserProfileStore.email,
    picture: searchUserProfileStore.picture,
    userID: searchUserProfileStore.userID,
  };
  const searchedUserFeed = searchUserProfileStore.posts;
  const followUser = async () => {
    // writing logic for followuser
    try {
      const followedTo = {
        email: searchUserProfileStore.email,
        userID: searchUserProfileStore.userID,
        picture: searchUserProfileStore.picture,
        name: searchUserProfileStore.name,
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
      console.log(data);
    } catch (err) {}
  };
  const showInnerMessage = async () => {
    // before getting new message we will reset the previous message stored into redux
    try {
      dispatch(mainPageMessageViewOnOff(true));
      dispatch(
        currentUserMessageAction({
          messageTo: searchUserProfileStore.userID,
          receiverPicture: searchUserProfileStore.picture,
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
        data: JSON.stringify({ userID: searchUserProfileStore.userID }),
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
  return (
    <>
      <div className="ProfilePage_Container">
        <div className="ProfilePage_UserInfo_Container">
          <div className="ProfilePage_UserInfo_Picture_Container">
            <img
              src={
                searchUserProfileStore.picture === undefined
                  ? User_Profile_Icon
                  : searchUserProfileStore.picture
              }
              alt="profile"
            />
          </div>
          <div className="ProfilePage_UserInfo_Detail_Container">
            <div className="ProfilePage_UserInfo_UserName_Msg_Container">
              <div className="ProfilePage_UserInfo_UserName_Container">
                <h1>{searchUserProfileStore.userID}</h1>
                <p>{searchUserProfileStore.name}</p>
              </div>
              <div
                className="ProfilePage_UserInfo_Message_Icon_Container"
                onClick={showInnerMessage}
              >
                <img src={mainPage_sideBar_message} alt="message" />
              </div>
            </div>
            <div className="ProfilePage_UserInfo_User_follow_Detail_Container">
              <p>188k followers</p>
              <p>60 followers</p>
              <p>1,001 Posts</p>
            </div>
          </div>
          <div className="ProfilePage_UserInfo_Follow_and_More_Button_Container">
            <div className="ProfilePage_UserInfo_More_Icon_Container">
              <MoreVertIcon />
            </div>
            <button
              className="ProfilePage_UserInfo_FollowUser_Button"
              onClick={followUser}
            >
              Follow
            </button>
          </div>
        </div>
        <div className="ProfilePage_UserContent_Route_Container">
          <div className="ProfilePage_UserContent_Feed_Route_Container">
            <span
              className="ProfilePage_UserContent_Feed_Icon iconify"
              data-icon="gg:feed"
            ></span>
          </div>
          <div className="ProfilePage_UserContent_Picture_Route_Container">
            <span
              className="ProfilePage_UserContent_Picture_Icon iconify"
              data-icon="akar-icons:image"
            ></span>
          </div>
          <div className="ProfilePage_UserContent_Friends_Route_Container">
            <span
              className="ProfilePage_UserContent_Friends_Icon iconify"
              data-icon="fa-solid:user-friends"
            ></span>
          </div>
        </div>
        <div className="ProfilePage_UserContent_Divider_Line"></div>
        <div className="ProfilePage_UserContent_Container">
          {searchedUserFeed.map((value) => (
            <UserPostFeed
              userMainInformation={searchedUserMainInformation}
              userFeedData={value}
              key={value._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchedProfilePage;
