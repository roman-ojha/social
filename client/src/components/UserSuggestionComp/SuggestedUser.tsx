import React from "react";
import { toastError } from "../../services/toast";
// import {
//   profilePageDataAction,
//   startProgressBar,
//   stopProgressBar,
//   isFollowedSuggestedUser,
//   openRightPartDrawer,
// } from "../../services/redux-actions";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useRouteToProfilePage from "../../hooks/useRouteToProfilePage";
import useFollowUser from "../../hooks/useFollowUser";
import useUnFollowUser from "../../hooks/useUnFollowUser";

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
  const routeToProfilePage = useRouteToProfilePage();
  const followUser = useFollowUser();
  const unFollowUser = useUnFollowUser();

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
              onClick={async () => {
                await unFollowUser({
                  userInformation: {
                    id: userInformation.id,
                    userID: userInformation.userID,
                    type: userInformation.type,
                  },
                  from: "userSuggestionComp",
                });
              }}
            >
              UnFollow
            </p>
          ) : (
            <p
              id="MainPage_Suggested_User_Follow_Button_Text"
              onClick={async () => {
                await followUser({
                  userInformation: {
                    id: userInformation.id,
                    userID: userInformation.userID,
                    type: userInformation.type,
                  },
                  from: "userSuggestionComp",
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

export default SuggestedUser;
