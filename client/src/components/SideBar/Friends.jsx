import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import GlobalApi from "../../services/api/global";
import {
  profilePageDataAction,
  startProgressBar,
  stopProgressBar,
} from "../../services/redux-actions";
import { toastError } from "../../services/toast";
import { useHistory } from "react-router-dom";

const Friends = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const MainPageFriend = (props) => {
    return (
      <>
        <div
          className="MainPage_SideBar_Friend_Outline"
          onClick={async () => {
            try {
              dispatch(startProgressBar());
              const res = await GlobalApi.getFriendData(
                props.friendDetail.userID
              );
              const userData = await res.data;
              if (res.status === 200 && userData.success) {
                // success
                const userObj = {
                  ...userData.searchedUser,
                  isRootUserFollowed: userData.isRootUserFollowed,
                };
                dispatch(profilePageDataAction(userObj));
                history.push(`/u/profile/${props.friendDetail.userID}/posts`);
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
          }}
        >
          <img
            src={
              props.friendDetail.picture === undefined
                ? User_Profile_Icon
                : props.friendDetail.picture
            }
            alt={props.friendDetail.userID}
            className="MainPage_SideBar_Friend_Image"
          />
          <p className="MainPage_SideBar_Friend_Name">
            {props.friendDetail.userID}
          </p>
          <div className="MainPage_SideBar_Friend_Active_Status">
            <p>Active</p>
          </div>
        </div>
      </>
    );
  };
  const ShowFriends = () => {
    // Displaying current user friends
    return (
      <>
        <div className="MainPage_SideBar_Friends_Inner_Container">
          {userProfileDetailStore.friends.map((friendDetail) => {
            return (
              <MainPageFriend
                friendDetail={friendDetail}
                key={friendDetail._id}
              />
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="MainPage_SideBar_Friends_Container">
        <h2 className="MainPage_SideBar_Friends_Title">Friends</h2>
        {/* <ShowFriends /> */}
      </div>
      <hr className="MainPage_SideBar_Horizontal_Line" />
    </>
  );
};

export default Friends;
