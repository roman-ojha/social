import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/profileFriends.css";
import { useHistory, useLocation } from "react-router-dom";
import { toastError } from "../services/toast";
import UserApi from "../services/api/global/user";
import {
  setProfilePageFriends,
  setProfilePageFollowers,
  setProfilePageFollowings,
  startProgressBar,
  stopProgressBar,
  profilePageDataAction,
} from "../services/redux-actions";
import GlobalApi from "../services/api/global";

const ProfileFriends = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const [userDetails, setUserDetails] = useState({
    fetchedData: false,
    user: [],
  });
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
      const res = await UserApi.getFriends(profilePageData.id);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        dispatch(setProfilePageFriends(data.friends));
        setUserDetails({
          fetchedData: true,
          user: data.friends,
        });
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

  const getUserFollowings = async () => {
    try {
      const res = await UserApi.getFollowings(profilePageData.id);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        dispatch(setProfilePageFollowings(data.friends));
        setUserDetails({
          fetchedData: true,
          user: data.friends,
        });
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

  const getUserFollowers = async () => {
    try {
      const res = await UserApi.getFollowers(profilePageData.id);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        dispatch(setProfilePageFollowers(data.friends));
        setUserDetails({
          fetchedData: true,
          user: data.friends,
        });
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
    if (location.pathname.includes("/friends")) {
      setUserDetails({
        fetchedData: false,
        user: [],
      });
      getUserFriends();
    } else if (location.pathname.includes("/following")) {
      setUserDetails({
        fetchedData: false,
        user: [],
      });
      getUserFollowings();
    } else if (location.pathname.includes("/followers")) {
      setUserDetails({
        fetchedData: false,
        user: [],
      });
      getUserFollowers();
    }
  }, [location.pathname]);

  return (
    <>
      {userDetails.fetchedData ? (
        <div className="ProfilePage_Friends_Container">
          {userDetails.user.map((userDetail, index) => {
            return (
              <div
                className="ProfilePage_Friend_Outline"
                key={index}
                style={{ textDecoration: "none", color: "black" }}
                onClick={async () => {
                  try {
                    dispatch(startProgressBar());
                    const res = await GlobalApi.getFriendData(
                      userDetail.userID
                    );
                    const userData = await res.data;
                    if (res.status === 200 && userData.success) {
                      // success
                      const userObj = {
                        ...userData.searchedUser,
                        isRootUserFollowed: userData.isRootUserFollowed,
                      };
                      dispatch(profilePageDataAction(userObj));
                      history.push(`/u/profile/${userDetail.userID}/posts`);
                    } else {
                      // error
                      toastError(userData.msg);
                    }
                    dispatch(stopProgressBar());
                  } catch (err) {
                    if (err.response.data.success === false) {
                      toastError(err.response.data.msg);
                    } else {
                      toastError(
                        "Some Problem Occur, Please Try again later!!!"
                      );
                    }
                    dispatch(stopProgressBar());
                  }
                }}
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
              </div>
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
