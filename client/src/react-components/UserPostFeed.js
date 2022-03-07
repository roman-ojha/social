import React, { useEffect, useState } from "react";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import { instance as axios } from "../services/axios";
import { useSelector } from "react-redux";

const UserPostFeed = (props) => {
  let uploadedTime;
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userPostdate = new Date(props.userFeedData.date);
  const [isLikedPost, setIsLikedPost] = useState(false);
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
  const like = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "/post/like",
        data: {
          postID: props.userFeedData.id,
          to: props.userMainInformation.userID,
        },
        withCredentials: true,
      });
      const data = await res.data;
      if (data.success & !data.remove) {
        setIsLikedPost(true);
      } else if (data.success & data.remove) {
        setIsLikedPost(false);
      }
      console.log(data);
    } catch (err) {}
  };
  useEffect(() => {
    // setIsLikedPost(
    //   props.userFeedData.likes.by.some(
    //     (el) => el.userID === userProfileDetailStore.userID
    //   )
    // );
  }, []);
  return (
    <>
      <div className="HomePage_Feed_Content_Container">
        <div className="HomePage_Feed_Image_Container">
          {props.userFeedData.picture === undefined ? (
            ""
          ) : (
            <img src={props.userFeedData.picture.url} alt="post" />
          )}
        </div>
        <div className="HomePage_Feed_User_Caption_Container">
          <p>{props.userFeedData.caption}</p>
        </div>
        <div className="HomePage_Feed_Info_Container">
          <div className="HomePage_Feed_Info_User_Image">
            <img
              src={
                props.userMainInformation.picture === undefined
                  ? User_Profile_Icon
                  : props.userMainInformation.picture
              }
              alt="user"
            />
          </div>
          <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
            <div className="HomePage_Feed_User_Name_Info_Container">
              <p className="HomePage_Feed_User_ID_Text">
                {props.userMainInformation.userID}
              </p>
              <p className="HomePage_Feed_User_Name_Text">
                {props.userMainInformation.name}
              </p>
            </div>
            <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
          </div>
          <div className="HomePage_Feed_Love_Comment_Share_Info_Container">
            <div className="HomePage_Feed_Icon_Container" onClick={like}>
              {isLikedPost ? (
                <span
                  className="iconify HomePage_Feed_Love_Icon"
                  data-icon="fluent:thumb-like-20-filled"
                ></span>
              ) : (
                <span
                  className="iconify HomePage_Feed_Love_Icon"
                  data-icon="fluent:thumb-like-20-regular"
                ></span>
              )}
              <p>{props.userFeedData.likes.No}</p>
            </div>
            <div className="HomePage_Feed_Icon_Container">
              <span
                className="iconify HomePage_Feed__Comment_Icon"
                data-icon="akar-icons:comment"
              ></span>
              <p>{props.userFeedData.comments.No}</p>
            </div>
            <span
              data-icon="bx:share"
              className="iconify HomePage_Feed_Share_Icon"
            ></span>
            <span
              className="iconify HomePage_Feed_More_Info_Icon"
              data-icon="ep:more"
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPostFeed;
