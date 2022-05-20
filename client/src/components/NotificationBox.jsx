import React from "react";
import "../styles/components/notificationBox.css";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import {
  startProgressBar,
  stopProgressBar,
  profilePageDataAction,
} from "../services/redux-actions";
import GlobalApi from "../services/api/global";
import { toastError } from "../services/toast";
import { useHistory } from "react-router-dom";

const NotificationBox = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
                      <div
                        className="Notification_Box_Single_Nft_Pic_and_Title"
                        onClick={async () => {
                          try {
                            dispatch(startProgressBar());
                            const res = await GlobalApi.getFriendData(
                              data.userID
                            );
                            const userData = await res.data;
                            if (res.status === 200 && userData.success) {
                              // success
                              const userObj = {
                                ...userData.searchedUser,
                                isRootUserFollowed: userData.isRootUserFollowed,
                              };
                              dispatch(profilePageDataAction(userObj));
                              history.push(`/u/profile/${data.userID}/posts`);
                            } else {
                              // error
                              toastError(userData.msg);
                            }
                            dispatch(stopProgressBar());
                          } catch (err) {
                            if (err.response.data.success === false) {
                              toastError(err.response.data.msg);
                            } else {
                              toastError(
                                "Some Problem Occur, Please Try again later!!!"
                              );
                            }
                            dispatch(stopProgressBar());
                          }
                        }}
                      >
                        <img
                          src={data.picture ? data.picture : User_Profile_Icon}
                        />
                        <p>{data.userID + " Started following you"}</p>
                      </div>
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
