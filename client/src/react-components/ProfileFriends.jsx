import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../assets/Images/User_profile_Icon.svg";
import "../styles/react-components/profileFriends.css";
import { NavLink, useLocation } from "react-router-dom";

const ProfileFriends = () => {
  const location = useLocation();
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (location.pathname.includes("/friends")) {
      setUserDetails(profilePageData.friends);
    } else if (location.pathname.includes("/followers")) {
      setUserDetails(profilePageData.followers);
    } else if (location.pathname.includes("/followings")) {
      setUserDetails(profilePageData.following);
    } else {
      setUserDetails(profilePageData.friends);
    }
  });
  return (
    <>
      <div className="ProfilePage_Friends_Container">
        {userDetails.map((userDetail, index) => {
          return (
            <NavLink
              to={`/u/profile/${userDetail.userID}`}
              className="ProfilePage_Friend_Outline"
              key={index}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={
                  userDetail.picture === undefined
                    ? User_Profile_Icon
                    : userDetail.picture
                }
                alt=""
                className="ProfilePage_Friend_Image"
              />
              <p className="ProfilePage_Friend_Name">{userDetail.userID}</p>
              <div className="ProfilePage_Friend_Active_Status">
                <p>Active</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default ProfileFriends;
