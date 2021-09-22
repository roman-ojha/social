import React, { useState } from "react";
import { useSelector } from "react-redux";

const MainPageRightSideComp = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const UserSuggession = () => {
    const SuggestedUser = () => {
      return (
        <>
          <div className="MainPage_Suggested_User_Container">
            <img
              className="MainPage_Suggested_User_Image"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
              alt=""
            />
            <div className="MainPage_Suggested_User_Name_Container">
              <p className="MainPage_Suggested_User_Name">Jaklin</p>
              <p className="MainPage_Suggested_User_Follower_Name">
                Follow By John
              </p>
            </div>
            <div className="MainPage_Suggested_User_Follow_Button">
              <p className="MainPage_Suggested_User_Follow_Button_Text">
                Follow
              </p>
            </div>
          </div>
        </>
      );
    };

    const ReturnSuggestedUser = () => {
      if (mainPageMessageOnOffState === false) {
        return (
          <>
            <SuggestedUser />
            <SuggestedUser />
            <SuggestedUser />
          </>
        );
      } else if (mainPageMessageOnOffState === true) {
        return (
          <>
            <SuggestedUser />
          </>
        );
      }
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

  const FollowedBy = () => {
    const FollowedUser = () => {
      return (
        <>
          <div className="MainPage_Followed_User_Container">
            <img
              className="MainPage_Followed_User_Image"
              src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
              alt=""
            />
            <div className="MainPage_Followed_User_Name_Container">
              <p className="MainPage_Followed_User_Name">Jaklin</p>
              <p className="MainPage_Followed_User_Follower_Name">
                Follow By John
              </p>
            </div>
            <div className="MainPage_Followed_User_Follow_Button">
              <p className="MainPage_Followed_User_Follow_Button_Text">
                Follow
              </p>
            </div>
          </div>
        </>
      );
    };
    const ReturnFollowedBy = () => {
      if (mainPageMessageOnOffState === false) {
        return (
          <>
            <FollowedUser />
            <FollowedUser />
          </>
        );
      } else if (mainPageMessageOnOffState === true) {
        return (
          <>
            <FollowedUser />
          </>
        );
      }
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

  const SponsoredBy = () => {
    const ReturnSponsoredBy = () => {
      if (mainPageMessageOnOffState == false) {
        return (
          <>
            <div className="MainPage_SponsoredBy_Container">
              <h4 className="MainPage_SponsoredBy_Title">Sponsored By</h4>
              <div className="MainPage_SponsoredBy_Inner_Container">
                <img
                  className="MainPage_Sponsored_Image"
                  src="https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg"
                  alt=""
                />
                <div className="MainPage_Sponsored_Name_Container">
                  <p className="MainPage_Sponsored_Name">Pubg</p>
                  <p className="MainPage_Sponsored_Info">
                    PlayerUnknown's Battlegrounds
                  </p>
                  <p className="MainPage_Sponsored_genre">Video Game</p>
                </div>
              </div>
            </div>
          </>
        );
      } else if (mainPageMessageOnOffState === true) {
        return <></>;
      }
    };
    return (
      <>
        <ReturnSponsoredBy />
      </>
    );
  };

  return (
    <>
      <div className="MainPage_Rignt_Side_Component_Container">
        <UserSuggession />
        <FollowedBy />
        <SponsoredBy />
      </div>
    </>
  );
};

export default MainPageRightSideComp;
