import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import GlobalApi from "../../services/api/global";
import UserApi from "../../services/api/global/user";
// import {
//   profilePageDataAction,
//   startProgressBar,
//   stopProgressBar,
//   setRootUserFriends,
// } from "../../services/redux-actions";
import { toastError } from "../../services/toast";
import { useHistory } from "react-router-dom";
import constant from "../../constant/constant";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../services/redux";

const Friends = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const rootUserFriends = useSelector(
    (state: AppState) => state.rootUserFriends
  );
  const {
    startProgressBar,
    stopProgressBar,
    setRootUserFriends,
    profilePageDataAction,
  } = bindActionCreators(actionCreators, dispatch);

  const MainPageFriend = (props) => {
    return (
      <>
        <div
          className="MainPage_SideBar_Friend_Outline"
          onClick={async () => {
            try {
              startProgressBar();
              const res = await GlobalApi.getFriendData(
                props.friendDetail.userID
              );
              const userData = await res.data;
              if (res.status === 200 && userData.success) {
                // success
                const userObj = {
                  ...userData.searchedUser,
                  isRootUserFollowed: userData.isRootUserFollowed,
                };
                profilePageDataAction(userObj);
                history.push(`/u/profile/${props.friendDetail.userID}/posts`);
              } else {
                // error
                toastError(userData.msg);
              }
              stopProgressBar();
            } catch (err) {
              if (err.response) {
                if (err.response.data.success === false) {
                  toastError(err.response.data.msg);
                }
              } else {
                toastError("Some Problem Occur, Please Try again later!!!");
              }
              stopProgressBar();
            }
          }}
        >
          <img
            src={
              props.friendDetail.picture === undefined
                ? User_Profile_Icon
                : props.friendDetail.picture
            }
            alt={props.friendDetail.userID}
            className="MainPage_SideBar_Friend_Image"
          />
          <p className="MainPage_SideBar_Friend_Name">
            {props.friendDetail.userID}
          </p>
          <div className="MainPage_SideBar_Friend_Active_Status">
            <p>Active</p>
          </div>
        </div>
      </>
    );
  };
  const ShowFriends = () => {
    // Displaying current user friends
    return (
      <>
        <div className="MainPage_SideBar_Friends_Inner_Container">
          {rootUserFriends.friends.map((friendDetail, index) => {
            return <MainPageFriend friendDetail={friendDetail} key={index} />;
          })}
        </div>
      </>
    );
  };
  const isTablets = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen768}px)`,
  });
  const isBigMobile = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen480}px)`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen320}px)`,
  });
  const isSmallMobile = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen280}px)`,
  });
  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const loadingSpinnerStyle = {
    border: "5px dotted #dddddd",
    borderTop: isSmallMobile
      ? "3px dotted var(--primary-color-darker-5)"
      : isMobile
      ? "4px dotted var(--primary-color-darker-5)"
      : isBigMobile
      ? "4px dotted var(--primary-color-darker-5)"
      : isTablets
      ? "4px dotted var(--primary-color-darker-5)"
      : "5px dotted var(--primary-color-darker-5)",
    width: isSmallMobile
      ? "0.9rem"
      : isMobile
      ? "1rem"
      : isBigMobile
      ? "1.2rem"
      : isTablets
      ? "1.4rem"
      : "1.5rem",
    height: isSmallMobile
      ? "0.9rem"
      : isMobile
      ? "1rem"
      : isBigMobile
      ? "1.2rem"
      : isTablets
      ? "1.4rem"
      : "1.5rem",
    borderRadius: "50%",
    animation: "loadingSpinner 1s linear infinite",
  };

  useEffect(() => {
    const getRootUserFriends = async () => {
      try {
        const res = await UserApi.getFriends(userProfileDetailStore.id);
        const data = await res.data;
        if (res.status === 200 && data.success) {
          setRootUserFriends({
            fetchedFriends: true,
            friends: data.friends,
          });
        } else {
          toastError("Some Error Occur While Fetching Friends Data");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
      }
    };
    getRootUserFriends();
  }, [dispatch, userProfileDetailStore.id]);

  return (
    <>
      <section className="MainPage_SideBar_Friends_Container">
        <h2 className="MainPage_SideBar_Friends_Title">Friends</h2>
        {rootUserFriends.fetchedFriends ? (
          <ShowFriends />
        ) : (
          <div style={loadingContainerSpinnerStyle}>
            <div style={loadingSpinnerStyle}></div>
          </div>
        )}
      </section>
      <hr className="MainPage_SideBar_Horizontal_Line" />
    </>
  );
};

export default Friends;
