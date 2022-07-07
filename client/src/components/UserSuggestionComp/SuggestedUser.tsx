import React from "react";
import { toastError, toastSuccess } from "../../services/toast";
import { instance as axios } from "../../services/axios";
// import {
//   profilePageDataAction,
//   startProgressBar,
//   stopProgressBar,
//   isFollowedSuggestedUser,
//   openRightPartDrawer,
// } from "../../services/redux-actions";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import GlobalApi from "../../services/api/global";
import { useMediaQuery } from "react-responsive";
import constant from "../../constant/constant";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../services/redux";
import { AxiosError } from "axios";

interface SuggestedUserProps {
  userInformation: any;
}

const SuggestedUser: React.FC<SuggestedUserProps> = ({
  userInformation,
}): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });
  const {
    profilePageDataAction,
    startProgressBar,
    stopProgressBar,
    isFollowedSuggestedUser,
    openRightPartDrawer,
  } = bindActionCreators(actionCreators, dispatch);

  const followUser = async (): Promise<void> => {
    if (userInformation.type !== "bot") {
      try {
        startProgressBar();
        const followedTo = {
          userID: userInformation.userID,
          id: userInformation.id,
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

          isFollowedSuggestedUser({
            userID: userInformation.userID,
            followed: true,
          });
          stopProgressBar();
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
        stopProgressBar();
      }
    } else {
      toastError("Sorry!!, can't be able to Follow bot");
    }
  };

  const unFollowUser = async (): Promise<void> => {
    if (userInformation.type !== "bot") {
      try {
        startProgressBar();
        const unfollowedTo = {
          userID: userInformation.userID,
          id: userInformation.id,
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
          isFollowedSuggestedUser({
            userID: userInformation.userID,
            followed: false,
          });
          stopProgressBar();
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
        stopProgressBar();
      }
    } else {
      toastError("Sorry!!, can't be able to Follow bot");
    }
  };

  const routeToProfile = async (userID: string): Promise<void> => {
    try {
      startProgressBar();
      const res = await GlobalApi.getFriendData(userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        profilePageDataAction(userObj);
        if (isMax850px) {
          openRightPartDrawer(false);
        }
        history.push(`/u/profile/${userID}/posts`);
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
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      stopProgressBar();
    }
  };

  return (
    <>
      <div className="MainPage_Suggested_User_Container">
        <img
          className="MainPage_Suggested_User_Image"
          src={
            userInformation.picture
              ? userInformation.picture
              : User_Profile_Icon
          }
          onClick={() => {
            if (userInformation.type !== "bot") {
              // history.push(`/u/profile/${props.userInformation.userID}/posts`);
              routeToProfile(userInformation.userID);
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
              if (userInformation.type !== "bot") {
                // history.push(
                //   `/u/profile/${props.userInformation.userID}/posts`
                // );
                routeToProfile(userInformation.userID);
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
          >
            {userInformation.name}
          </p>
          <p
            className="MainPage_Suggested_User_Follower_Name"
            onClick={() => {
              if (userInformation.type !== "bot") {
                // history.push(
                //   `/u/profile/${props.userInformation.userID}/posts`
                // );
                routeToProfile(userInformation.userID);
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
          >
            {/* Followed By John */}
            {/* NOTE We need to implement Follow by <user> feature but for right now we will who userID here */}
            {userInformation.userID}
          </p>
        </div>
        <div className="MainPage_Suggested_User_Follow_Button">
          {userInformation.followed ? (
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
