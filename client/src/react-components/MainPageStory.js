import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";

const AddStory = () => {
  return (
    <>
      <div className="Current_User_Story_Container">
        <div className="Current_User_Story_Picure_Container">
          <AddCircleOutlineRoundedIcon
            className="Current_User_Story_Add_Icon"
            style={{ color: "white", height: "1.2rem" }}
          />
          <img
            src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
            alt=""
            className="Current_User_Story_Picture"
          />
        </div>
        <p className="Current_User_Story_Name">Create</p>
      </div>
    </>
  );
};

const FriendStory = () => {
  return (
    <>
      <div className="Friends_Story_Container">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt=""
          className="Friend_Story_Picture"
        />
        <p className="Friend_Story_Name">Jaklin</p>
      </div>
    </>
  );
};

const MainPageStory = () => {
  return (
    <>
      <div className="MainPage_User_Stories_Container">
        <AddStory />
        <FriendStory />
        <FriendStory />
        <FriendStory />
        <FriendStory />
        <FriendStory />
        <FriendStory />
        <FriendStory />
      </div>
    </>
  );
};

export default MainPageStory;
