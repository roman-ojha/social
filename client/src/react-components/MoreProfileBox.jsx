import React from "react";
import "../styles/react-components/moreProfileBox.css";
import User_Profile_Icon from "../assets/Images/User_profile_Icon.svg";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const MoreProfileBox = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const date = new Date();
  return (
    <>
      <div className="More_Profile_Box_Container">
        <NavLink
          to={`/u/profile/${userProfileDetailStore.userID}`}
          className="More_Profile_Box_User_Info"
        >
          <img
            src={
              userProfileDetailStore.picture
                ? userProfileDetailStore.picture
                : User_Profile_Icon
            }
            alt="user"
          />
          <p>Roman Ojha</p>
        </NavLink>
        <NavLink to="/u/setting" className="More_Profile_Box_Setting">
          <Icon
            icon="ant-design:setting-filled"
            className="More_Profile_Box_Icon"
          />
          <p>Setting</p>
        </NavLink>
        <div className="More_Profile_Box_Help">
          <Icon icon="bxs:help-circle" className="More_Profile_Box_Icon" />
          <p>Help</p>
        </div>
        <NavLink to="" className="More_Profile_Box_logout">
          <Icon icon="majesticons:logout" className="More_Profile_Box_Icon" />
          <p>Log Out</p>
        </NavLink>
        <p>Social &copy; {date.getFullYear()}</p>
      </div>
    </>
  );
};

export default MoreProfileBox;
