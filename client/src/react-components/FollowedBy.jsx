import React from "react";
import { useSelector } from "react-redux";
import "../styles/react-components/userSuggestionFollowdBySponsoredBy.css";

const FollowedBy = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const FollowedUser = (props) => {
    return (
      <>
        <div className="MainPage_Followed_User_Container">
          <img
            className="MainPage_Followed_User_Image"
            src={props.userInformation.picture}
            alt=""
          />
          <div className="MainPage_Followed_User_Name_Container">
            <p className="MainPage_Followed_User_Name">
              {props.userInformation.name}
            </p>
            <p className="MainPage_Followed_User_Follower_Name">
              {/* Followed By John */}
              {/* NOTE We need to implement Follow by <user> feature but for right now we will who userID here */}
              {props.userInformation.userID}
            </p>
          </div>
          <div className="MainPage_Followed_User_Follow_Button">
            <p className="MainPage_Followed_User_Follow_Button_Text">Follow</p>
          </div>
        </div>
      </>
    );
  };
  const ReturnFollowedBy = () => {
    const followedBy = useSelector((state) => state.followedByUserReducer);
    return (
      <>
        {followedBy.map((user, index) => {
          if (mainPageMessageOnOffState === false && index < 2) {
            return <FollowedUser key={index} userInformation={user} />;
          } else if (mainPageMessageOnOffState === true && index < 1) {
            return <FollowedUser key={index} userInformation={user} />;
          }
        })}
      </>
    );
  };
  return (
    <>
      <div
        className={
          mainPageMessageOnOffState
            ? "MainPage_FollowedBy_Container_MinView"
            : "MainPage_FollowedBy_Container"
        }
      >
        <h4 className="MainPage_FollowedBy_Title">Followed By</h4>
        <div className="MainPage_FollowedBy_Inner_Container">
          <ReturnFollowedBy />
        </div>
      </div>
    </>
  );
};

export default FollowedBy;
