import React from "react";
import { Icon } from "@iconify/react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Api from "../../services/api/components/MainPageSideBar";
import { toastSuccess, toastError } from "../../services/toast";
import {
  startProgressBar,
  stopProgressBar,
} from "../../services/redux-actions";

const Account = () => {
  const history = useHistory();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const dispatch = useDispatch();
  const userLogOut = async () => {
    try {
      dispatch(startProgressBar());

      const res = await Api.logOut();
      const data = await res.data;
      history.push("/signin", { replace: true });
      if (res.status === 200 && data.success) {
        toastSuccess(data.msg);
      } else {
        // const error = new Error(res.error);
        // throw error;
        toastError(data.msg);
      }
      dispatch(stopProgressBar());
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      history.push("/signin", { replace: true });
      dispatch(stopProgressBar());
    }
  };
  return (
    <>
      <div className="MainPage_SideBar_User_Account_LogOut_Container">
        <h2 className="MainPage_SideBar_Account_Title">Account</h2>
        <div className="MainPage_SideBar_User_Account_Logout_Outline">
          <img
            src={
              userProfileDetailStore.picture === undefined
                ? User_Profile_Icon
                : userProfileDetailStore.picture
            }
            className="MainPage_SideBar_User_Account_Img"
            onClick={() => {
              history.push(`/u/profile/${userProfileDetailStore.userID}/posts`);
            }}
            alt="profile"
          />
          <h3
            className="MainPage_SideBar_User_Account_Name"
            onClick={() => {
              history.push(`/u/profile/${userProfileDetailStore.userID}/posts`);
            }}
          >
            {userProfileDetailStore.userID === undefined
              ? userProfileDetailStore.name
              : userProfileDetailStore.userID}
          </h3>
          <Icon
            className="MainPage_LogOut_Icon"
            icon="ri:logout-circle-line"
            onClick={userLogOut}
          />
          <button
            className="MainPage_SideBar_User_Logout_Button"
            onClick={userLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
