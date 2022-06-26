import React from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/settingPage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import ChangeProfilePicture from "../components/SettingPage/ChangeProfilePicture";
import ChangeUserID from "../components/SettingPage/ChangeUserID";
import ChangeDisplayName from "../components/SettingPage/ChangeDisplayName";
import ChangePassword from "../components/SettingPage/ChangePassword";
import DeleteProfile from "../components/SettingPage/DeleteProfile";

const Setting = () => {
  return (
    <>
      <LoadingSpinner />
      <main className="SettingPage_Container">
        <Helmet>
          <title>Setting</title>
        </Helmet>
        <OpenSideBarDrawerButton />
        <OpenRightPartDrawerButton />
        <ChangeProfilePicture />
        <ChangeUserID />
        <ChangeDisplayName />
        <ChangePassword />
        <DeleteProfile />
      </main>
    </>
  );
};

export default Setting;
