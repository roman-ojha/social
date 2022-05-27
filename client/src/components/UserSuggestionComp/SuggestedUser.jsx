import React from "react";
import { toastError, toastSuccess } from "../../services/toast";
import { instance as axios } from "../../services/axios";
import {
  profilePageDataAction,
  startProgressBar,
  stopProgressBar,
  isFollowedSuggestedUser,
  openRightPartDrawer,
} from "../../services/redux-actions";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import GlobalApi from "../../services/api/global";
import { useMediaQuery } from "react-responsive";
import constant from "../../constant/constant";

const SuggestedUser = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });

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
            isFollowedSuggestedUser({
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
            isFollowedSuggestedUser({
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
        if (isMax850px) {
          dispatch(openRightPartDrawer(false));
        }
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
      <div className="MainPage_Suggested_User_Container">
        <img
          className="MainPage_Suggested_User_Image"
          src={
            props.userInformation.picture
              ? props.userInformation.picture
              : User_Profile_Icon
          }
          onClick={() => {
            if (props.userInformation.type !== "bot") {
              // history.push(`/u/profile/${props.userInformation.userID}/posts`);
              routeToProfile(props.userInformation.userID);
            } else {
              toastError("Sorry!!, can't be able to open bot Profile");
            }
          }}
          alt="user"
        />
        <div className="MainPage_Suggested_User_Name_Container">
          <p
            className="MainPage_Suggested_User_Name"
            onClick={() => {
              if (props.userInformation.type !== "bot") {
                // history.push(
                //   `/u/profile/${props.userInformation.userID}/posts`
                // );
                routeToProfile(props.userInformation.userID);
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
          >
            {props.userInformation.name}
          </p>
          <p
            className="MainPage_Suggested_User_Follower_Name"
            onClick={() => {
              if (props.userInformation.type !== "bot") {
                // history.push(
                //   `/u/profile/${props.userInformation.userID}/posts`
                // );
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
        <div className="MainPage_Suggested_User_Follow_Button">
          {props.userInformation.followed ? (
            <p
              className="MainPage_Suggested_User_Follow_Button_Text"
              onClick={unFollowUser}
            >
              UnFollow
            </p>
          ) : (
            <p
              className="MainPage_Suggested_User_Follow_Button_Text"
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

export default SuggestedUser;
