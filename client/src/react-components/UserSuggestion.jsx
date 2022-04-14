import React from "react";
import { useSelector } from "react-redux";
import "../styles/react-components/userSuggestionFollowdBySponsoredBy.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const UserSuggestion = () => {
  const history = useHistory();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const SuggestedUser = (props) => {
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
            <p
              className="MainPage_Suggested_User_Follow_Button_Text"
              onClick={() => {
                if (props.userInformation.type !== "bot") {
                  // Follow user
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
              }}
            >
              Follow
            </p>
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
