import React from "react";
import mainPage_sideBar_message from "../Images/mainPage_sideBar_message.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserPostFeed from "./UserPostFeed";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";

const SearchedProfilePage = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userProfilePostStore = useSelector(
    (state) => state.setUserProfilePostReducer
  );
  return (
    <>
      <div className="ProfilePage_Container">
        <div className="ProfilePage_UserInfo_Container">
          <div className="ProfilePage_UserInfo_Picture_Container">
            <img
              src={
                userProfileDetailStore.picture === undefined
                  ? User_Profile_Icon
                  : userProfileDetailStore.picture
              }
              alt="profile"
            />
          </div>
          <div className="ProfilePage_UserInfo_Detail_Container">
            <div className="ProfilePage_UserInfo_UserName_Msg_Container">
              <div className="ProfilePage_UserInfo_UserName_Container">
                <h1>{userProfileDetailStore.userID}</h1>
                <p>{userProfileDetailStore.name}</p>
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
            <button className="ProfilePage_UserInfo_FollowUser_Button">
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
          {userProfilePostStore.map((value) => (
            <UserPostFeed userFeedData={value} key={value._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchedProfilePage;
