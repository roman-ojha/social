import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/settingPage.css";
import { useDispatch } from "react-redux";
import { startProgressBar, stopProgressBar } from "../services/redux-actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../services/api/pages/settingPageApi";
import { toastError, toastInfo, toastSuccess } from "../services/toast";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import ChangeProfilePicture from "../components/SettingPage/ChangeProfilePicture";
import ChangeUserID from "../components/SettingPage/ChangeUserID";
import ChangeDisplayName from "../components/SettingPage/ChangeDisplayName";
import ChangePassword from "../components/SettingPage/ChangePassword";

const Setting = () => {
  const dispatch = useDispatch();

  const deleteUser = (e) => {
    e.preventDefault();
    toastInfo("Sorry!! this feature is not available right now");
  };

  return (
    <>
      <LoadingSpinner />
      <main className="SettingPage_Container">
        <ToastContainer />
        <Helmet>
          <title>Setting</title>
        </Helmet>
        <OpenSideBarDrawerButton />
        <OpenRightPartDrawerButton />
        <ChangeProfilePicture />
        <ChangeUserID />
        <ChangeDisplayName />
        <ChangePassword />
        <div className="Setting_Page_Delete_User_Profile_Container">
          <h1>Delete User Profile</h1>
          <p>
            NOTE : You can be able to recover after you delete your user profile
          </p>
          <button onClick={deleteUser}>Delete Profile</button>
        </div>
      </main>
    </>
  );
};

export default Setting;
