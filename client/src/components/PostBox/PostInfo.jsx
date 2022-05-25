import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../../services/api/global";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";
import {
  startProgressBar,
  stopProgressBar,
  profilePageDataAction,
  setRootUserProfileDataState,
} from "../../services/redux-actions";
import { useHistory } from "react-router-dom";

const PostInfo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  const routeToProfile = async (userID) => {
    try {
      dispatch(startProgressBar());
      const res = await GlobalApi.getFriendData(userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        dispatch(profilePageDataAction(userObj));
        if (userID === userProfileDetailStore.userID) {
          dispatch(
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            })
          );
        }
        history.push(`/u/profile/${userID}/posts`);
      } else {
        // error
        toastError(userData.msg);
      }
      dispatch(stopProgressBar());
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };

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
          onClick={() => {
            routeToProfile(props.postUserID);
          }}
        />
      </div>
      <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
        <div className="HomePage_Feed_User_Name_Info_Container">
          <p
            className="HomePage_Feed_User_ID_Text"
            onClick={() => {
              routeToProfile(props.postUserID);
            }}
          >
            {props.postUserID}
          </p>
          <p
            className="HomePage_Feed_User_Name_Text"
            onClick={() => {
              routeToProfile(props.postUserID);
            }}
          >
            {props.postUserName}
          </p>
        </div>
        <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
      </div>
    </>
  );
};

export default PostInfo;
