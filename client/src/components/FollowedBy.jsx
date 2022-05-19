import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/components/userSuggestionFollowdBySponsoredBy.css";
import { useHistory } from "react-router-dom";
import { toastError, toastSuccess } from "../services/toast";
import {
  profilePageDataAction,
  isFollowedFollowedByUser,
  startProgressBar,
  stopProgressBar,
} from "../services/redux-actions";
import { instance as axios } from "../services/axios";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../services/api/global";

const FollowedBy = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector((state) => state.notificationBox);
  const moreProfileBoxState = useSelector(
    (state) => state.moreProfileBoxReducer
  );
  const FollowedUser = (props) => {
    const followUser = async () => {
      if (props.userInformation.type !== "bot") {
        try {
          dispatch(startProgressBar());
          const followedTo = {
            userID: props.userInformation.userID,
            id: props.userInformation.id,
          };
          const response = await axios({
            method: "POST",
            url: "/u/follow",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(followedTo),
            // sending both follwedTo and FollowedBy
            withCredentials: true,
          });
          const data = await response.data;
          if (response.status === 200 && data.success) {
            toastSuccess(data.msg);
            dispatch(
              isFollowedFollowedByUser({
                userID: props.userInformation.userID,
                followed: true,
              })
            );
            dispatch(stopProgressBar());
          }
        } catch (err) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          } else {
            toastError("Some Problem Occur, Please Try again Letter!!!");
          }
          dispatch(stopProgressBar());
        }
      } else {
        toastError("Sorry!!, can't be able to Follow bot");
      }
    };

    const unFollowUser = async () => {
      if (props.userInformation.type !== "bot") {
        try {
          dispatch(startProgressBar());
          const unfollowedTo = {
            userID: props.userInformation.userID,
            id: props.userInformation.id,
          };
          const response = await axios({
            method: "POST",
            url: "/u/unfollow",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(unfollowedTo),
            // sending both follwedTo and FollowedBy
            withCredentials: true,
          });
          const data = await response.data;
          if (response.status === 200 && data.success) {
            toastSuccess(data.msg);
            dispatch(
              isFollowedFollowedByUser({
                userID: props.userInformation.userID,
                followed: false,
              })
            );
            dispatch(stopProgressBar());
          }
        } catch (err) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          } else {
            toastError("Some Problem Occur, Please Try again Letter!!!");
          }
          dispatch(stopProgressBar());
        }
      } else {
        toastError("Sorry!!, can't be able to Follow bot");
      }
    };

    const routeToProfile = async (userID) => {
      try {
        dispatch(startProgressBar());
        const res = await GlobalApi.getFriendData(userID);
        const userData = await res.data;
        if (res.status === 200 && userData.success) {
          // success
          const userObj = {
            ...userData.searchedUser,
            isRootUserFollowed: userData.isRootUserFollowed,
          };
          dispatch(profilePageDataAction(userObj));
          history.push(`/u/profile/${userID}/posts`);
        } else {
          // error
          toastError(userData.msg);
        }
        dispatch(stopProgressBar());
      } catch (err) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
        dispatch(stopProgressBar());
      }
    };

    return (
      <>
        <div className="MainPage_Followed_User_Container">
          <img
            className="MainPage_Followed_User_Image"
            src={
              props.userInformation.picture
                ? props.userInformation.picture
                : User_Profile_Icon
            }
            onClick={() => {
              if (props.userInformation.type !== "bot") {
                // history.push(`/u/profile/${props.userInformation.userID}`);
                routeToProfile(props.userInformation.userID);
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
            alt=""
          />
          <div className="MainPage_Followed_User_Name_Container">
            <p
              className="MainPage_Followed_User_Name"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  // history.push(`/u/profile/${props.userInformation.userID}`);
                  routeToProfile(props.userInformation.userID);
                } else {
                  toastError("Sorry!!, can't be able to open bot Profile");
                }
              }}
            >
              {props.userInformation.name}
            </p>
            <p
              className="MainPage_Followed_User_Follower_Name"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  // history.push(`/u/profile/${props.userInformation.userID}`);
                  routeToProfile(props.userInformation.userID);
                } else {
                  toastError("Sorry!!, can't be able to open bot Profile");
                }
              }}
            >
              {/* Followed By John */}
              {/* NOTE We need to implement Follow by <user> feature but for right now we will who userID here */}
              {props.userInformation.userID}
            </p>
          </div>
          <div className="MainPage_Followed_User_Follow_Button">
            {props.userInformation.followed ? (
              <p
                className="MainPage_Followed_User_Follow_Button_Text"
                onClick={unFollowUser}
              >
                UnFollow
              </p>
            ) : (
              <p
                className="MainPage_Followed_User_Follow_Button_Text"
                onClick={followUser}
              >
                Follow
              </p>
            )}
          </div>
        </div>
      </>
    );
  };
  const ReturnFollowedBy = () => {
    const followedBy = useSelector((state) => state.followedByUserReducer);
    return (
      <>
        {followedBy.map((user, index) => {
          if (
            !mainPageMessageOnOffState &&
            !notificationBoxState.open &&
            !moreProfileBoxState
          ) {
            if (index < 2) {
              return <FollowedUser key={index} userInformation={user} />;
            }
          } else if (
            mainPageMessageOnOffState ||
            notificationBoxState.open ||
            moreProfileBoxState
          ) {
            if (index < 1) {
              return <FollowedUser key={index} userInformation={user} />;
            }
          }
        })}
      </>
    );
  };
  return (
    <>
      <div
        className={
          mainPageMessageOnOffState ||
          notificationBoxState.open ||
          moreProfileBoxState
            ? "MainPage_FollowedBy_Container_MinView"
            : "MainPage_FollowedBy_Container"
        }
      >
        <h4 className="MainPage_FollowedBy_Title">Followed By</h4>
        <div className="MainPage_FollowedBy_Inner_Container">
          <ReturnFollowedBy />
        </div>
      </div>
    </>
  );
};

export default FollowedBy;
