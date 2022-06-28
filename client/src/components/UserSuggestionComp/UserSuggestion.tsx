import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "../../styles/components/userSuggestionFollowdBySponsoredBy.css";
import { useEffect } from "react";
import SuggestedUser from "./SuggestedUser";
import { AppState } from "../../services/redux";

const UserSuggestion = (): JSX.Element => {
  const mainPageMessageOnOffState = useSelector(
    (state: AppState) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector(
    (state: AppState) => state.notificationBox
  );
  const moreProfileBoxState = useSelector(
    (state: AppState) => state.moreProfileBoxReducer
  );
  const ReturnSuggestedUser = (): JSX.Element => {
    const countUser = useRef(0);
    const userSuggestion = useSelector(
      (state: AppState) => state.userSuggestionReducer
    );

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
              } else {
                return "";
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
              } else {
                return "";
              }
            } else {
              return "";
            }
          } else {
            return "";
          }
        })}
      </>
    );
  };

  return (
    <>
      <section
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
      </section>
    </>
  );
};

export default UserSuggestion;
