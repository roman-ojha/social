import React from "react";
import "../styles/components/notificationBox.css";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
// import {
//   startProgressBar,
//   stopProgressBar,
//   profilePageDataAction,
//   openRightPartDrawer,
// } from "../services/redux-actions";
import { useMediaQuery } from "react-responsive";
import constant from "../constant/constant";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../services/redux";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ProfilePageDataState } from "../services/redux/pages/profile/profilePageData/types";
import useRouteToProfilePage from "../hooks/useRouteToProfilePage";

const buttonStyle = makeStyles({
  root: {},
  buttonRipple: { color: "var(--white-opacity-6)" },
});

const NotificationBox = (): JSX.Element => {
  const ButtonClass = buttonStyle();
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const notificationBoxState = useSelector(
    (state: AppState) => state.notificationBox
  );
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });
  const {
    startProgressBar,
    stopProgressBar,
    profilePageDataAction,
    openRightPartDrawer,
  } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      {notificationBoxState.open ? (
        <div className="Notification_Box_Container">
          <h1>Notification</h1>
          <hr className="Notification_Title_HR" />
          <div className="Notification_Container">
            {notificationBoxState.notificationData.length === 0 ? (
              <p>Empty</p>
            ) : (
              <div className="Show_Notification_Container">
                {notificationBoxState.notificationData.map((data, index) => {
                  return (
                    <Button
                      TouchRippleProps={{
                        classes: { root: ButtonClass.buttonRipple },
                      }}
                      className={ButtonClass.root}
                      key={index}
                      id="Single_Notification_Container"
                    >
                      <div
                        id="Notification_Box_Single_Nft_Pic_and_Title"
                        onClick={async () => {
                          await routeToProfilePage({ userID: data.userID });
                        }}
                      >
                        <img
                          src={data.picture ? data.picture : User_Profile_Icon}
                          alt=""
                        />
                        <p>{data.userID + " Started following you"}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NotificationBox;
