import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/profileFriends.css";
import { NavLink, useLocation } from "react-router-dom";
import constant from "../constant/constant";
import { useMediaQuery } from "react-responsive";

const ProfileFriends = () => {
  const location = useLocation();
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const [userDetails, setUserDetails] = useState([]);
  // const rootUserFriends = useSelector((state) => state.rootUserFriends);
  // useEffect(() => {
  //   if (location.pathname.includes("/friends")) {
  //     setUserDetails(profilePageData.friends);
  //   } else if (location.pathname.includes("/followers")) {
  //     setUserDetails(profilePageData.followers);
  //   } else if (location.pathname.includes("/followings")) {
  //     setUserDetails(profilePageData.following);
  //   } else {
  //     setUserDetails(profilePageData.friends);
  //   }
  // });
  // const isTablets = useMediaQuery({
  //   query: `(max-width:${constant.mediaQueryRes.screen768}px)`,
  // });
  // const isBigMobile = useMediaQuery({
  //   query: `(max-width:${constant.mediaQueryRes.screen480}px)`,
  // });
  // const isMobile = useMediaQuery({
  //   query: `(max-width:${constant.mediaQueryRes.screen320}px)`,
  // });
  // const isSmallMobile = useMediaQuery({
  //   query: `(max-width:${constant.mediaQueryRes.screen280}px)`,
  // });
  // const loadingContainerSpinnerStyle = {
  //   width: "100%",
  //   height: "100%",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // };
  // const loadingSpinnerStyle = {
  //   border: "5px dotted #dddddd",
  //   borderTop: isSmallMobile
  //     ? "3px dotted var(--primary-color-darker-5)"
  //     : isMobile
  //     ? "4px dotted var(--primary-color-darker-5)"
  //     : isBigMobile
  //     ? "4px dotted var(--primary-color-darker-5)"
  //     : isTablets
  //     ? "4px dotted var(--primary-color-darker-5)"
  //     : "5px dotted var(--primary-color-darker-5)",
  //   width: isSmallMobile
  //     ? "0.9rem"
  //     : isMobile
  //     ? "1rem"
  //     : isBigMobile
  //     ? "1.2rem"
  //     : isTablets
  //     ? "1.4rem"
  //     : "1.5rem",
  //   height: isSmallMobile
  //     ? "0.9rem"
  //     : isMobile
  //     ? "1rem"
  //     : isBigMobile
  //     ? "1.2rem"
  //     : isTablets
  //     ? "1.4rem"
  //     : "1.5rem",
  //   borderRadius: "50%",
  //   animation: "loadingSpinner 1s linear infinite",
  // };
  return (
    <>
      {
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
      }
    </>
  );
};

export default ProfileFriends;
