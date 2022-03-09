import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import "../styles/react-components/mainPageStory.css";

const MainPageStory = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
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
              src={
                userProfileDetailStore.picture === undefined
                  ? User_Profile_Icon
                  : userProfileDetailStore.picture
              }
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
          <div className="Friends_Story_Picutre_Container">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
              alt=""
              className="Friend_Story_Picture"
            />
          </div>
          <p className="Friend_Story_Name">Jaklin</p>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="MainPage_User_Stories_Container">
        <AddStory />
        {/* showing friends story */}
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
