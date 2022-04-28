import React from "react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../assets/Images/User_profile_Icon.svg";
import "../styles/react-components/profileFriends.css";
const ProfileFriends = () => {
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  return (
    <div className="ProfilePage_Friends_Container">
      {profilePageData.friends.map((friendDetail, index) => {
        return (
          <div className="ProfilePage_Friend_Outline" key={index}>
            <img
              src={
                friendDetail.picture === undefined
                  ? User_Profile_Icon
                  : friendDetail.picture
              }
              alt=""
              className="ProfilePage_Friend_Image"
            />
            <p className="ProfilePage_Friend_Name">{friendDetail.userID}</p>
            <div className="ProfilePage_Friend_Active_Status">
              <p>Active</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileFriends;
