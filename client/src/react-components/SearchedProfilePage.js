import React from "react";
import mainPage_sideBar_message from "../Images/mainPage_sideBar_message.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserPostFeed from "./UserPostFeed";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import { instance as axios } from "../services/axios";

const SearchedProfilePage = () => {
  const searchUserProfileStore = useSelector(
    (state) => state.setSearchUserProfileReducer
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
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
      });
      const data = await response.data;
      console.log(data);
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
              <div className="ProfilePage_UserInfo_Message_Icon_Container">
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
