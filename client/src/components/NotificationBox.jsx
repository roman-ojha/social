import React from "react";
import "../styles/components/notificationBox.css";
import { useSelector } from "react-redux";

const NotificationBox = () => {
  const notificationBoxState = useSelector((state) => state.notificationBox);
  return (
    <>
      {notificationBoxState.open ? (
        <div className="Notification_Box_Container">
          <h1>Notification</h1>
          <hr className="Notification_Title_HR" />
          <div className="Notification_Container">
            <p>Empty</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NotificationBox;
