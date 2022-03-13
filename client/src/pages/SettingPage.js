import React from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/settingPage.css";

const SettingPage = () => {
  return (
    <>
      <div className="SettingPage_Container">
        <Helmet>
          <title>Setting</title>
        </Helmet>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change UserID</h1>
          <form>
            <input type="text" placeholder="UserID" />
            <button>Change</button>
          </form>
          <p>You can only be able to set unique ID for your profile</p>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change display name</h1>
          <form>
            <input type="text" placeholder="Display Name" />
            <button>Change</button>
          </form>
          <p>Not require to be unique</p>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change Password</h1>
          <input type="password" placeholder="Old password" />
          <input type="password" placeholder="New password" />
          <form>
            <input type="password" placeholder="Conform password" />
            <button>Change</button>
          </form>
          <p>Don't Forgot Your Password</p>
        </div>
        <div className="Setting_Page_Delete_User_Profile_Container">
          <h1>Delete User Profile</h1>
          <p>
            NOTE : You can be able to recover after you delete your user profile
          </p>
          <button>Delete Profile</button>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
