import React from "react";
import mainPage_sideBar_profile from "../Images/mainPage_sideBar_profile.svg";
import mainPage_sideBar_message from "../Images/mainPage_sideBar_message.svg";
import more_icon from "../Images/more_icon.svg";
import notification_icon from "../Images/notification_icon.svg";

const MainPageMsgAndNtfBar = () => {
  return (
    <>
      <div className="MainPage_Message_and_Notification_Bar_Container">
        <div className="MainPage_Message_Bar_Message_Outline">
          <img src={mainPage_sideBar_message} alt="message" />
        </div>
        <div className="MainPage_Message_Bar_Notification_Outline">
          <img src={notification_icon} alt="notification" />
        </div>
        <div className="MainPage_Message_Bar_More_Outline">
          <img src={more_icon} alt="more" />
        </div>
        <img
          className="MainPage_Message_Bar_Profile"
          src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
          alt="profile"
        />
      </div>
    </>
  );
};

export default MainPageMsgAndNtfBar;
