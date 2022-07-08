import React, { memo } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import GlobalApi from "../../services/api/global";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../services/toast";
// import {
//   startProgressBar,
//   stopProgressBar,
//   profilePageDataAction,
//   setRootUserProfileDataState,
// } from "../../services/redux-actions";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../src/services/redux";
import { Month } from "src/interface/month";
import { PostInformationInterface } from "./PostBox";
import UserPostType from "src/interface/userPost";
import { AxiosError } from "axios";

interface PostInfoProps {
  postUserID: PostInformationInterface["userID"];
  postUserName: PostInformationInterface["userName"];
  postUserPicture: PostInformationInterface["postPicture"];
  postDate: UserPostType["date"];
}

const PostInfo: React.FC<PostInfoProps> = ({
  postDate,
  postUserID,
  postUserName,
  postUserPicture,
}): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  let uploadedTime: string;
  const userPostdate = new Date(postDate);
  // const userPostUTCTime = userPostdate.toUTCString();
  const currentDate = new Date();
  // const currentUTCTime = currentDate.toUTCString();
  const difference = (currentDate.getTime() - userPostdate.getTime()) / 1000;
  const monthNames: Month = [
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
    uploadedTime = `${parseInt(`${difference}`)}s`;
  } else if (difference >= 60 && difference < 3600) {
    uploadedTime = `${parseInt(`${difference / 60}`)}m`;
  } else if (difference >= 3600 && difference < 86400) {
    uploadedTime = `${parseInt(`${difference / 3600}`)}hr`;
  } else if (difference >= 86400 && difference < 604800) {
    uploadedTime = `${parseInt(`${difference / 86400}`)}d`;
  } else if (difference >= 604800 && difference < 31536000) {
    const getDate = userPostdate.getDate();
    const getMonth = userPostdate.getMonth();
    const getHour = userPostdate.getHours();
    const getMinute = userPostdate.getMinutes();
    uploadedTime = `${monthNames[getMonth]} ${getDate} at ${getHour}:${getMinute}`;
  } else {
    const getDate = userPostdate.getDate();
    const getYear = userPostdate.getFullYear();
    const getMonth = userPostdate.getMonth();
    uploadedTime = `${monthNames[getMonth]} ${getDate}, ${getYear}`;
  }
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const {
    startProgressBar,
    stopProgressBar,
    profilePageDataAction,
    setRootUserProfileDataState,
  } = bindActionCreators(actionCreators, dispatch);

  const routeToProfile = async (userID: PostInformationInterface["userID"]) => {
    try {
      startProgressBar();
      const res = await GlobalApi.getFriendData(userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        profilePageDataAction(userObj);
        if (userID === userProfileDetailStore.userID) {
          setRootUserProfileDataState({
            fetchedRootUserProfileData: true,
            getRootUserProfileData: false,
          });
        }
        history.push(`/u/profile/${userID}/posts`);
      } else {
        // error
        toastError(userData.msg);
      }
      stopProgressBar();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      stopProgressBar();
    }
  };

  return (
    <>
      <div className="HomePage_Feed_Info_User_Image">
        <img
          src={
            postUserPicture === undefined ? User_Profile_Icon : postUserPicture
          }
          alt="user"
          onClick={() => {
            routeToProfile(postUserID);
          }}
        />
      </div>
      <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
        <div className="HomePage_Feed_User_Name_Info_Container">
          <p
            className="HomePage_Feed_User_ID_Text"
            onClick={() => {
              routeToProfile(postUserID);
            }}
          >
            {postUserID}
          </p>
          <p
            className="HomePage_Feed_User_Name_Text"
            onClick={() => {
              routeToProfile(postUserID);
            }}
          >
            {postUserName}
          </p>
        </div>
        <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
      </div>
    </>
  );
};

export default memo(PostInfo);
