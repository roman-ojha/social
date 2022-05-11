import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "../../styles/components/userSuggestionFollowdBySponsoredBy.css";
import { useEffect } from "react";
import SuggestedUser from "./SuggestedUser";

const UserSuggestion = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector((state) => state.notificationBox);
  const moreProfileBoxState = useSelector(
    (state) => state.moreProfileBoxReducer
  );
  const ReturnSuggestedUser = () => {
    const countUser = useRef(0);
    const userSuggestion = useSelector((state) => state.userSuggestionReducer);
    useEffect(() => {
      countUser.current = 0;
    }, [userSuggestion]);
    return (
      <>
        {userSuggestion.map((user, index) => {
          if (user.userID !== undefined) {
            if (
              !mainPageMessageOnOffState &&
              !notificationBoxState.open &&
              !moreProfileBoxState
            ) {
              if (countUser.current < 3) {
                countUser.current++;
                return (
                  <SuggestedUser
                    key={index.toString()}
                    userInformation={user}
                  />
                );
              }
            } else if (
              mainPageMessageOnOffState ||
              notificationBoxState.open ||
              moreProfileBoxState
            ) {
              if (countUser.current < 1) {
                countUser.current++;
                return (
                  <SuggestedUser
                    key={index.toString()}
                    userInformation={user}
                  />
                );
              }
            }
          }
        })}
      </>
    );
  };

  return (
    <>
      <div
        className={
          mainPageMessageOnOffState ||
          notificationBoxState.open ||
          moreProfileBoxState
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
