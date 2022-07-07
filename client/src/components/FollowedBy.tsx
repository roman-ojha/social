import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/components/userSuggestionFollowdBySponsoredBy.css";
import { useHistory } from "react-router-dom";
import { toastError, toastSuccess } from "../services/toast";
// import {
//   profilePageDataAction,
//   isFollowedFollowedByUser,
//   startProgressBar,
//   stopProgressBar,
//   openRightPartDrawer,
// } from "../services/redux-actions";
import { instance as axios } from "../services/axios";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../services/api/global";
import constant from "../constant/constant";
import { useMediaQuery } from "react-responsive";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MUIButtonStyles } from "./UserSuggestionComp/SuggestedUser";

const FollowedBy = ({ classes, ...other }): JSX.Element => {
  const { button: buttonClass, ...rippleClasses } = classes;
  const history = useHistory();
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state: AppState) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector(
    (state: AppState) => state.notificationBox
  );
  const moreProfileBoxState = useSelector(
    (state: AppState) => state.moreProfileBoxReducer
  );
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });

  const {
    profilePageDataAction,
    isFollowedFollowedByUser,
    startProgressBar,
    stopProgressBar,
    openRightPartDrawer,
  } = bindActionCreators(actionCreators, dispatch);

  interface FollowedUserProps {
    userInformation: any;
  }

  const FollowedUser: React.FC<FollowedUserProps> = ({
    userInformation,
  }): JSX.Element => {
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
            isFollowedFollowedByUser({
              userID: userInformation.userID,
              followed: true,
              type: "",
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
            isFollowedFollowedByUser({
              userID: userInformation.userID,
              followed: false,
              type: "",
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
        <div className="MainPage_Followed_User_Container">
          <img
            className="MainPage_Followed_User_Image"
            src={
              userInformation.picture
                ? userInformation.picture
                : User_Profile_Icon
            }
            onClick={() => {
              if (userInformation.type !== "bot") {
                // history.push(`/u/profile/${props.userInformation.userID}`);
                routeToProfile(userInformation.userID);
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
                if (userInformation.type !== "bot") {
                  // history.push(`/u/profile/${props.userInformation.userID}`);
                  routeToProfile(userInformation.userID);
                } else {
                  toastError("Sorry!!, can't be able to open bot Profile");
                }
              }}
            >
              {userInformation.name}
            </p>
            <p
              className="MainPage_Followed_User_Follower_Name"
              onClick={() => {
                if (userInformation.type !== "bot") {
                  // history.push(`/u/profile/${props.userInformation.userID}`);
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
          <Button
            id="MainPage_Followed_User_Follow_Button"
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
          >
            {userInformation.followed ? (
              <p
                id="MainPage_Followed_User_Follow_Button_Text"
                onClick={unFollowUser}
              >
                UnFollow
              </p>
            ) : (
              <p
                id="MainPage_Followed_User_Follow_Button_Text"
                onClick={followUser}
              >
                Follow
              </p>
            )}
          </Button>
        </div>
      </>
    );
  };
  const ReturnFollowedBy = (): JSX.Element => {
    const followedBy = useSelector(
      (state: AppState) => state.followedByUserReducer
    );
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
            } else {
              return "";
            }
          } else if (
            mainPageMessageOnOffState ||
            notificationBoxState.open ||
            moreProfileBoxState
          ) {
            if (index < 1) {
              return <FollowedUser key={index} userInformation={user} />;
            } else {
              return "";
            }
          } else {
            return "";
          }
        })}
      </>
    );
  };
  return (
    <>
      <section
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
      </section>
    </>
  );
};

export default withStyles(MUIButtonStyles)(FollowedBy);
