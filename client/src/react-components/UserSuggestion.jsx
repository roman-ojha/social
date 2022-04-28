import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/react-components/userSuggestionFollowdBySponsoredBy.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { instance as axios } from "../services/axios";
import { useState } from "react";
import {
  startProgressBar,
  stopProgressBar,
  followOrOnFollowSuggestedUser,
} from "../redux-actions";

const UserSuggestion = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const SuggestedUser = (props) => {
    const [followedUser, setFollowedUser] = useState(false);
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
            toast.success(data.msg, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
            });
            dispatch(
              followOrOnFollowSuggestedUser({
                userID: props.userInformation.userID,
                followed: true,
              })
            );
            dispatch(stopProgressBar());
          }
        } catch (err) {
          if (err.response.data.success === false) {
            toast.error(err.response.data.err, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
            });
          } else {
            toast.error("Some Problem Occur, Please Try again Letter!!!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
            });
          }
          dispatch(stopProgressBar());
        }
      } else {
        toast.error("Sorry!!, can't be able to Follow bot", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
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
            toast.success(data.msg, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
            });
            dispatch(
              followOrOnFollowSuggestedUser({
                userID: props.userInformation.userID,
                followed: false,
              })
            );
            dispatch(stopProgressBar());
          }
        } catch (err) {
          if (err.response.data.success === false) {
            toast.error(err.response.data.err, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
            });
          } else {
            toast.error("Some Problem Occur, Please Try again Letter!!!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
            });
          }
          dispatch(stopProgressBar());
        }
      } else {
        toast.error("Sorry!!, can't be able to Follow bot", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      }
    };

    return (
      <>
        <div className="MainPage_Suggested_User_Container">
          <img
            className="MainPage_Suggested_User_Image"
            src={props.userInformation.picture}
            onClick={() => {
              if (props.userInformation.type !== "bot") {
                history.push(`/u/profile/${props.userInformation.userID}`);
              } else {
                toast.error("Sorry!!, can't be able to open bot Profile", {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  pauseOnFocusLoss: false,
                });
              }
            }}
            alt="user"
          />
          <div className="MainPage_Suggested_User_Name_Container">
            <p
              className="MainPage_Suggested_User_Name"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  history.push(`/u/profile/${props.userInformation.userID}`);
                } else {
                  toast.error("Sorry!!, can't be able to open bot Profile", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                  });
                }
              }}
            >
              {props.userInformation.name}
            </p>
            <p
              className="MainPage_Suggested_User_Follower_Name"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  history.push(`/u/profile/${props.userInformation.userID}`);
                } else {
                  toast.error("Sorry!!, can't be able to open bot Profile", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                  });
                }
              }}
            >
              {/* Followed By John */}
              {/* NOTE We need to implement Follow by <user> feature but for right now we will who userID here */}
              {props.userInformation.userID}
            </p>
          </div>
          <div className="MainPage_Suggested_User_Follow_Button">
            {props.userInformation.followed ? (
              <p
                className="MainPage_Suggested_User_Follow_Button_Text"
                onClick={unFollowUser}
              >
                UnFollow
              </p>
            ) : (
              <p
                className="MainPage_Suggested_User_Follow_Button_Text"
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

  const ReturnSuggestedUser = () => {
    const userSuggestion = useSelector((state) => state.userSuggestionReducer);
    return (
      <>
        {userSuggestion.map((user, index) => {
          if (index < 3 && mainPageMessageOnOffState === false) {
            return (
              <SuggestedUser key={index.toString()} userInformation={user} />
            );
          } else if (index < 1 && mainPageMessageOnOffState === true) {
            return (
              <SuggestedUser key={index.toString()} userInformation={user} />
            );
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
            ? "MainPage_UserSuggession_Container_MinView"
            : "MainPage_UserSuggession_Container"
        }
        id="MainPage_UserSuggession_Container_ID"
      >
        <h4 className="MainPage_UserSuggession_Title">Suggestion For You</h4>
        <div className="MainPage_UserSuggession_Inner_Container">
          <ReturnSuggestedUser />
        </div>
      </div>
    </>
  );
};

export default UserSuggestion;
