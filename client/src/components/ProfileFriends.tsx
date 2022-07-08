import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import "../styles/components/profileFriends.css";
import { useLocation } from "react-router-dom";
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
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import UserDocument from "../interface/userDocument";
import { AxiosError } from "axios";
import useRouteToProfilePage from "../hooks/useRouteToProfilePage";

const ProfileFriends = (): JSX.Element => {
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const location = useLocation();
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
  const {
    setProfilePageFriends,
    setProfilePageFollowers,
    setProfilePageFollowings,
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
                  await routeToProfilePage({
                    userID: userDetail.userID,
                    from: "profileFriendsComp",
                  });
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
