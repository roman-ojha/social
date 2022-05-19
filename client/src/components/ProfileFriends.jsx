import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/profileFriends.css";
import { NavLink, useLocation } from "react-router-dom";
import { toastError } from "../services/toast";
import UserApi from "../services/api/global/user";
import { setProfilePageFriends } from "../services/redux-actions";

const ProfileFriends = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const [userDetails, setUserDetails] = useState([]);
  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1.5rem",
  };
  const loadingSpinnerStyle = {
    border: "5px dotted #dddddd",
    borderTop: "5px dotted var(--primary-color-darker-5)",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    animation: "loadingSpinner 1s linear infinite",
  };

  const getUserFriends = async () => {
    try {
      const res = await UserApi.getRootUserFriends(profilePageData.id);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        dispatch(
          setProfilePageFriends({
            fetchedFriendsOrFollowersOrFollowing: true,
            friends: data.friends,
          })
        );
        setUserDetails(data.friends);
      } else {
        toastError("Some Error Occur While Fetching Friends Data");
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur while fetching friends data");
      }
    }
  };

  useEffect(() => {
    if (
      !profilePageData.fetchedFriendsOrFollowersOrFollowing &&
      location.pathname.includes("/friends")
    ) {
      getUserFriends();
    } else if (
      !profilePageData.fetchedFriendsOrFollowersOrFollowing &&
      location.pathname.includes("/followings")
    ) {
      // getUserFriends();
    } else if (
      !profilePageData.fetchedFriendsOrFollowersOrFollowing &&
      location.pathname.includes("/followers")
    ) {
      // getUserFriends();
    }
  });

  return (
    <>
      {profilePageData.fetchedFriendsOrFollowersOrFollowing ? (
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
      ) : (
        <div style={loadingContainerSpinnerStyle}>
          <div style={loadingSpinnerStyle}></div>
        </div>
      )}
    </>
  );
};

export default ProfileFriends;
