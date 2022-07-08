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
import { bindActionCreators } from "redux";
import { actionCreators } from "../../services/redux";
import { AxiosError } from "axios";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useRouteToProfilePage from "../../hooks/useRouteToProfilePage";

const buttonStyle = makeStyles({
  root: {},
  buttonRipple: { color: "var(--white-opacity-3)" },
});

interface SuggestedUserProps {
  userInformation: any;
}

const SuggestedUser: React.FC<SuggestedUserProps> = ({
  userInformation,
}): JSX.Element => {
  const ButtonClass = buttonStyle();
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const { startProgressBar, stopProgressBar, isFollowedSuggestedUser } =
    bindActionCreators(actionCreators, dispatch);

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
          onClick={async () => {
            if (userInformation.type !== "bot") {
              await routeToProfilePage({
                userID: userInformation.userID,
                from: "suggestionComp",
              });
            } else {
              toastError("Sorry!!, can't be able to open bot Profile");
            }
          }}
          alt="user"
        />
        <div className="MainPage_Suggested_User_Name_Container">
          <p
            className="MainPage_Suggested_User_Name"
            onClick={async () => {
              if (userInformation.type !== "bot") {
                await routeToProfilePage({
                  userID: userInformation.userID,
                  from: "suggestionComp",
                });
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
          >
            {userInformation.name}
          </p>
          <p
            className="MainPage_Suggested_User_Follower_Name"
            onClick={async () => {
              if (userInformation.type !== "bot") {
                await routeToProfilePage({
                  userID: userInformation.userID,
                  from: "suggestionComp",
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
          id="MainPage_Suggested_User_Follow_Button"
          TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
          className={ButtonClass.root}
        >
          {userInformation.followed ? (
            <p
              id="MainPage_Suggested_User_Follow_Button_Text"
              onClick={unFollowUser}
            >
              UnFollow
            </p>
          ) : (
            <p
              id="MainPage_Suggested_User_Follow_Button_Text"
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

export default SuggestedUser;
