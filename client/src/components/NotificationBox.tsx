import React from "react";
import styles from "../styles/modules/components/notificationBox.module.css";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { AppState } from "../services/redux";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useRouteToProfilePage from "../hooks/useRouteToProfilePage";

const buttonStyle = makeStyles({
  root: {},
  buttonRipple: { color: "var(--white-opacity-6)" },
});

const NotificationBox = (): JSX.Element => {
  const ButtonClass = buttonStyle();
  const routeToProfilePage = useRouteToProfilePage();
  const notificationBoxState = useSelector(
    (state: AppState) => state.notificationBox
  );

  return (
    <>
      {notificationBoxState.open ? (
        <div className={styles.box_Container}>
          <h1>Notification</h1>
          <hr />
          <div className={styles.inner_container}>
            {notificationBoxState.notificationData.length === 0 ? (
              <p>Empty</p>
            ) : (
              <div className={styles.notification_list_container}>
                {notificationBoxState.notificationData.map((data, index) => {
                  return (
                    <Button
                      TouchRippleProps={{
                        classes: { root: ButtonClass.buttonRipple },
                      }}
                      className={ButtonClass.root}
                      key={index}
                      id={styles.single_notification}
                    >
                      <div
                        id={styles.single_notification_pic_and_title}
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
