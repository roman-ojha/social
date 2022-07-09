import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/components/userSuggestionFollowdBySponsoredBy.css";
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
import constant from "../constant/constant";
import { useMediaQuery } from "react-responsive";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useRouteToProfilePage from "../hooks/useRouteToProfilePage";
import useFollowUser from "../hooks/useFollowUser";

const buttonStyle = makeStyles({
  root: {},
  buttonRipple: { color: "var(--white-opacity-3)" },
});

const FollowedBy = (): JSX.Element => {
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const followUser = useFollowUser();
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

  const { isFollowedFollowedByUser, startProgressBar, stopProgressBar } =
    bindActionCreators(actionCreators, dispatch);

  interface FollowedUserProps {
    userInformation: any;
  }

  const FollowedUser: React.FC<FollowedUserProps> = ({
    userInformation,
  }): JSX.Element => {
    const ButtonClass = buttonStyle();

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
            onClick={async () => {
              if (userInformation.type !== "bot") {
                await routeToProfilePage({
                  userID: userInformation.userID,
                  from: "followedByComp",
                });
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
            alt=""
          />
          <div className="MainPage_Followed_User_Name_Container">
            <p
              className="MainPage_Followed_User_Name"
              onClick={async () => {
                if (userInformation.type !== "bot") {
                  await routeToProfilePage({
                    userID: userInformation.userID,
                    from: "followedByComp",
                  });
                } else {
                  toastError("Sorry!!, can't be able to open bot Profile");
                }
              }}
            >
              {userInformation.name}
            </p>
            <p
              className="MainPage_Followed_User_Follower_Name"
              onClick={async () => {
                if (userInformation.type !== "bot") {
                  await routeToProfilePage({
                    userID: userInformation.userID,
                    from: "followedByComp",
                  });
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
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
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
                onClick={async () => {
                  await followUser({
                    userInformation: {
                      id: userInformation.id,
                      userID: userInformation.userID,
                      type: userInformation.type,
                    },
                    from: "followedByComp",
                  });
                }}
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

export default FollowedBy;
