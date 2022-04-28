import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/react-components/userSuggestionFollowdBySponsoredBy.css";
import { useHistory } from "react-router-dom";
import { toastError, toastSuccess } from "../services/toast";
import {
  isFollowedFollowedByUser,
  startProgressBar,
  stopProgressBar,
} from "../redux-actions";
import { instance as axios } from "../services/axios";

const FollowedBy = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const FollowedUser = (props) => {
    const followUser = async () => {
      if (props.userInformation.type !== "bot") {
        try {
          dispatch(startProgressBar());
          const followedTo = {
            email: props.userInformation.email,
            userID: props.userInformation.userID,
            picture: props.userInformation.picture,
            name: props.userInformation.picture,
          };
          const response = await axios({
            method: "POST",
            url: "/u/follow",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(followedTo),
            // sending both follwedTo and FollowedBy
            withCredentials: true,
          });
          const data = await response.data;
          if (response.status === 200 && data.success === true) {
            toastSuccess(data.msg);
            dispatch(
              isFollowedFollowedByUser({
                userID: props.userInformation.userID,
                followed: true,
              })
            );
            dispatch(stopProgressBar());
          }
        } catch (err) {
          if (err.response.data.success === false) {
            toastError(err.response.data.err);
          } else {
            toastError("Some Problem Occur, Please Try again Letter!!!");
          }
          dispatch(stopProgressBar());
        }
      } else {
        toastError("Sorry!!, can't be able to Follow bot");
      }
    };

    const unFollowUser = async () => {
      if (props.userInformation.type !== "bot") {
        try {
          dispatch(startProgressBar());
          const unfollowedTo = {
            email: props.userInformation.email,
            userID: props.userInformation.userID,
            picture: props.userInformation.picture,
            name: props.userInformation.name,
          };
          const response = await axios({
            method: "POST",
            url: "/u/unfollow",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(unfollowedTo),
            // sending both follwedTo and FollowedBy
            withCredentials: true,
          });
          const data = await response.data;
          if (response.status === 200 && data.success === true) {
            toastSuccess(data.msg);
            dispatch(
              isFollowedFollowedByUser({
                userID: props.userInformation.userID,
                followed: false,
              })
            );
            dispatch(stopProgressBar());
          }
        } catch (err) {
          if (err.response.data.success === false) {
            toastError(err.response.data.err);
          } else {
            toastError("Some Problem Occur, Please Try again Letter!!!");
          }
          dispatch(stopProgressBar());
        }
      } else {
        toastError("Sorry!!, can't be able to Follow bot");
      }
    };

    return (
      <>
        <div className="MainPage_Followed_User_Container">
          <img
            className="MainPage_Followed_User_Image"
            src={props.userInformation.picture}
            onClick={() => {
              if (props.userInformation.type !== "bot") {
                history.push(`/u/profile/${props.userInformation.userID}`);
              } else {
                toastError("Sorry!!, can't be able to open bot Profile");
              }
            }}
            alt=""
          />
          <div className="MainPage_Followed_User_Name_Container">
            <p
              className="MainPage_Followed_User_Name"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  history.push(`/u/profile/${props.userInformation.userID}`);
                } else {
                  toastError("Sorry!!, can't be able to open bot Profile");
                }
              }}
            >
              {props.userInformation.name}
            </p>
            <p
              className="MainPage_Followed_User_Follower_Name"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  history.push(`/u/profile/${props.userInformation.userID}`);
                } else {
                  toastError("Sorry!!, can't be able to open bot Profile");
                }
              }}
            >
              {/* Followed By John */}
              {/* NOTE We need to implement Follow by <user> feature but for right now we will who userID here */}
              {props.userInformation.userID}
            </p>
          </div>
          <div className="MainPage_Followed_User_Follow_Button">
            {props.userInformation.followed ? (
              <p
                className="MainPage_Followed_User_Follow_Button_Text"
                onClick={unFollowUser}
              >
                UnFollow
              </p>
            ) : (
              <p
                className="MainPage_Followed_User_Follow_Button_Text"
                onClick={followUser}
              >
                Follow
              </p>
            )}
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
