import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/settingPage.css";

const SettingPage = () => {
  const [settingInputFieldData, setSettingInputFieldData] = useState({
    userID: "",
    name: "",
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
  });
  const getInputFieldData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSettingInputFieldData({
      ...settingInputFieldData,
      [name]: value,
    });
  };
  const changeUserID = () => {};
  const changeName = () => {};
  const chnagePassword = () => {};
  const deleteUser = () => {};
  return (
    <>
      <div className="SettingPage_Container">
        <Helmet>
          <title>Setting</title>
        </Helmet>
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
            <button onClick={chnagePassword}>Change</button>
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
      </div>
    </>
  );
};

export default SettingPage;
