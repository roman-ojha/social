import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/profileFriends.css";
import { useHistory, useLocation } from "react-router-dom";
import { toastError } from "../services/toast";
import UserApi from "../services/api/global/user";
import { Helmet } from "react-helmet";
// import {
//   setProfilePageFriends,
//   setProfilePageFollowers,
//   setProfilePageFollowings,
//   startProgressBar,
//   stopProgressBar,
//   profilePageDataAction,
//   setRootUserProfileDataState,
// } from "../services/redux-actions";
import GlobalApi from "../services/api/global";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import UserDocument from "../interface/userDocument";
import { AxiosError } from "axios";
import { ProfilePageDataState } from "src/services/redux/pages/profile/profilePageData/types";

const ProfileFriends = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [userDetails, setUserDetails] = useState<{
    fetchedData: boolean;
    user: UserDocument[];
  }>({
    fetchedData: false,
    user: [],
  });
  const profilePageData = useSelector(
    (state: AppState) => state.profilePageDataReducer
  );
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const {
    setProfilePageFriends,
    setProfilePageFollowers,
    setProfilePageFollowings,
    startProgressBar,
    stopProgressBar,
    profilePageDataAction,
    setRootUserProfileDataState,
  } = bindActionCreators(actionCreators, dispatch);

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

  useEffect(() => {
    const getUserFriends = async (): Promise<void> => {
      try {
        const res = await UserApi.getFriends(profilePageData.id);
        const data = await res.data;
        if (res.status === 200 && data.success) {
          setProfilePageFriends(data.friends);
          setUserDetails({
            fetchedData: true,
            user: data.friends,
          });
        } else {
          toastError("Some Error Occur While Fetching Friends Data");
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
      }
    };

    const getUserFollowings = async (): Promise<void> => {
      try {
        const res = await UserApi.getFollowings(profilePageData.id);
        const data = await res.data;
        if (res.status === 200 && data.success) {
          setProfilePageFollowings(data.friends);
          setUserDetails({
            fetchedData: true,
            user: data.friends,
          });
        } else {
          toastError("Some Error Occur While Fetching Friends Data");
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
      }
    };

    const getUserFollowers = async (): Promise<void> => {
      try {
        const res = await UserApi.getFollowers(profilePageData.id);
        const data = await res.data;
        if (res.status === 200 && data.success) {
          setProfilePageFollowers(data.friends);
          setUserDetails({
            fetchedData: true,
            user: data.friends,
          });
        } else {
          toastError("Some Error Occur While Fetching Friends Data");
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
      }
    };
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
  }, [dispatch, location.pathname, profilePageData.id]);

  return (
    <>
      <Helmet>
        <title>{profilePageData.userID}/friends</title>
      </Helmet>
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
                    startProgressBar();
                    const res = await GlobalApi.getFriendData(
                      userDetail.userID
                    );
                    const userData = await res.data;
                    if (res.status === 200 && userData.success) {
                      // success
                      const userObj: ProfilePageDataState = {
                        ...userData.searchedUser,
                        isRootUserFollowed: userData.isRootUserFollowed,
                        throughRouting: true,
                      };
                      profilePageDataAction(userObj);
                      if (userDetail.userID === userProfileDetailStore.userID) {
                        setRootUserProfileDataState({
                          fetchedRootUserProfileData: true,
                          getRootUserProfileData: false,
                        });
                      }
                      history.push(`/u/profile/${userDetail.userID}/posts`);
                    } else {
                      // error
                      toastError(userData.msg);
                    }
                    stopProgressBar();
                  } catch (error) {
                    const err = error as AxiosError;
                    if (err.response) {
                      if (err.response.data.success === false) {
                        toastError(err.response.data.msg);
                      }
                    } else {
                      toastError(
                        "Some Problem Occur, Please Try again later!!!"
                      );
                    }
                    stopProgressBar();
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
