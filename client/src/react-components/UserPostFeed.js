import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserPostFeed = (props) => {
  let uploadedTime;
  const userPostdate = new Date(props.userFeedData.date);
  const userPostUTCTime = userPostdate.toUTCString();
  const currentDate = new Date();
  const currentUTCTime = currentDate.toUTCString();
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
      <div className="HomePage_Feed_Content_Container">
        <div className="HomePage_Feed_Image_Container">
          {props.userFeedData.pictureUrl === "" ? (
            ""
          ) : (
            <img src={props.userFeedData.pictureUrl} alt="post" />
          )}
        </div>
        <div className="HomePage_Feed_User_Caption_Container">
          <p>{props.userFeedData.caption}</p>
        </div>
        <div className="HomePage_Feed_Info_Container">
          <div className="HomePage_Feed_Info_User_Image">
            <img
              src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
              alt="user"
            />
          </div>
          <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
            <div className="HomePage_Feed_User_Name_Info_Container">
              <p className="HomePage_Feed_User_ID_Text">
                Kath_and_renfdsaasdafafdds
              </p>
              <p className="HomePage_Feed_User_Name_Text">
                {props.userFeedData.username}
              </p>
            </div>
            <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
          </div>
          <div className="HomePage_Feed_Love_Comment_Share_Info_Container">
            <FavoriteBorderIcon
              className="HomePage_Feed_Love_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
            <CommentRoundedIcon
              className="HomePage_Feed__Comment_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
            <ShareIcon
              className="HomePage_Feed_Share_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
            <MoreVertIcon
              className="HomePage_Feed_More_Info_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPostFeed;
