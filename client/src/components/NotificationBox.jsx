import React from "react";
import "../styles/components/notificationBox.css";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const NotificationBox = () => {
  const notificationBoxState = useSelector((state) => state.notificationBox);
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
                    <div key={index} className="Single_Notification_Container">
                      <NavLink
                        to={`/u/profile/${data.userID}`}
                        className="Notification_Box_Single_Nft_Pic_and_Title"
                      >
                        <img src={data.picture} />
                        <p>{data.userID + " Started following you"}</p>
                      </NavLink>
                    </div>
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
