import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";

const PostInfo = (props) => {
  let uploadedTime;
  const userPostdate = new Date(props.postDate);
  // const userPostUTCTime = userPostdate.toUTCString();
  const currentDate = new Date();
  // const currentUTCTime = currentDate.toUTCString();
  const difference = (currentDate.getTime() - userPostdate.getTime()) / 1000;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (difference < 60) {
    uploadedTime = `${parseInt(difference)}s`;
  } else if (difference >= 60 && difference < 3600) {
    uploadedTime = `${parseInt(difference / 60)}m`;
  } else if (difference >= 3600 && difference < 86400) {
    uploadedTime = `${parseInt(difference / 3600)}hr`;
  } else if (difference >= 86400 && difference < 604800) {
    uploadedTime = `${parseInt(difference / 86400)}d`;
  } else if (difference >= 604800 && difference < 31536000) {
    let getDate = userPostdate.getDate();
    let getMonth = userPostdate.getMonth();
    let getHour = userPostdate.getHours();
    let getMinute = userPostdate.getMinutes();
    uploadedTime = `${monthNames[getMonth]} ${getDate} at ${getHour}:${getMinute}`;
  } else {
    let getDate = userPostdate.getDate();
    let getYear = userPostdate.getFullYear();
    let getMonth = userPostdate.getMonth();
    uploadedTime = `${monthNames[getMonth]} ${getDate}, ${getYear}`;
  }
  return (
    <>
      <div className="HomePage_Feed_Info_User_Image">
        <img
          src={
            props.postUserPicture === undefined
              ? User_Profile_Icon
              : props.postUserPicture
          }
          alt="user"
        />
      </div>
      <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
        <div className="HomePage_Feed_User_Name_Info_Container">
          <p className="HomePage_Feed_User_ID_Text">{props.postUserID}</p>
          <p className="HomePage_Feed_User_Name_Text">{props.postUserName}</p>
        </div>
        <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
      </div>
    </>
  );
};

export default PostInfo;
