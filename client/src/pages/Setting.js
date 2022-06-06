import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/settingPage.css";
import { useDispatch } from "react-redux";
import {
  changeRootUserUserIDAction,
  changeRootUserNameAction,
  startProgressBar,
  stopProgressBar,
} from "../services/redux-actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../services/api/pages/settingPageApi";
import { toastError, toastInfo, toastSuccess } from "../services/toast";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import ChangeProfilePicture from "../components/SettingPage/ChangeProfilePicture";

const Setting = () => {
  const dispatch = useDispatch();
  const [settingInputFieldData, setSettingInputFieldData] = useState({
    userID: "",
    name: "",
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
    imgUrl: "",
  });
  const getInputFieldData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSettingInputFieldData({
      ...settingInputFieldData,
      [name]: value,
    });
  };
  const changeUserID = async (e) => {
    try {
      e.preventDefault();
      dispatch(startProgressBar());
      const res = await Api.changeUserID(settingInputFieldData);
      const resData = await res.data;
      if (resData.success) {
        toastSuccess(resData.msg);
        dispatch(changeRootUserUserIDAction(resData.userID));
      } else {
        toastError(resData.msg);
      }
      dispatch(stopProgressBar());
      setSettingInputFieldData({
        ...settingInputFieldData,
        userID: "",
      });
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };
  const changeName = async (e) => {
    try {
      e.preventDefault();
      dispatch(startProgressBar());
      const res = await Api.changeName(settingInputFieldData);
      const resData = await res.data;
      if (resData.success && res.status === 200) {
        toastSuccess(resData.msg);
        dispatch(changeRootUserNameAction(resData.name));
      } else {
        toastError(resData.msg);
      }
      dispatch(stopProgressBar());
      setSettingInputFieldData({
        ...settingInputFieldData,
        name: "",
      });
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };
  const changePassword = async (e) => {
    try {
      e.preventDefault();
      dispatch(startProgressBar());
      const res = await Api.changePassword(settingInputFieldData);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        toastSuccess(data.msg);
      } else {
        toastError(data.msg);
      }
      dispatch(stopProgressBar());
      setSettingInputFieldData({
        ...settingInputFieldData,
        oldPassword: "",
        newPassword: "",
        cNewPassword: "",
      });
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };
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
        <div className="Setting_Container_With_Input_Field">
          <h1>Change UserID</h1>
          <form>
            <input
              type="text"
              placeholder="UserID"
              name="userID"
              value={settingInputFieldData.userID}
              onChange={getInputFieldData}
            />
            <button onClick={changeUserID}>Change</button>
          </form>
          <p>You can only be able to set unique ID for your profile</p>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change display name</h1>
          <form>
            <input
              type="text"
              placeholder="Display Name"
              name="name"
              value={settingInputFieldData.name}
              onChange={getInputFieldData}
            />
            <button onClick={changeName}>Change</button>
          </form>
          <p>Not require to be unique</p>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change Password</h1>
          <input
            type="password"
            placeholder="Old password"
            name="oldPassword"
            value={settingInputFieldData.oldPassword}
            onChange={getInputFieldData}
          />
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
            value={settingInputFieldData.newPassword}
            onChange={getInputFieldData}
          />
          <form>
            <input
              type="password"
              placeholder="Conform password"
              name="cNewPassword"
              value={settingInputFieldData.cNewPassword}
              onChange={getInputFieldData}
            />
            <button onClick={changePassword}>Change</button>
          </form>
          <p>Don't Forgot Your Password</p>
        </div>
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
