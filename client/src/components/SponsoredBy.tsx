import React from "react";
import { useSelector } from "react-redux";
import "../styles/components/userSuggestionFollowdBySponsoredBy.css";
import GoogleImage from "../assets/Images/google_image.jpg";
import { AppState } from "../services/redux";

const SponsoredBy = (): JSX.Element => {
  const mainPageMessageOnOffState = useSelector(
    (state: AppState) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector(
    (state: AppState) => state.notificationBox
  );
  const moreProfileBoxState = useSelector(
    (state: AppState) => state.moreProfileBoxReducer
  );
  if (
    !mainPageMessageOnOffState &&
    !notificationBoxState.open &&
    !moreProfileBoxState
  ) {
    return (
      <>
        <div className="MainPage_SponsoredBy_Container">
          <h4 className="MainPage_SponsoredBy_Title">Sponsored By</h4>
          <div className="MainPage_SponsoredBy_Inner_Container">
            <img
              className="MainPage_Sponsored_Image"
              src={GoogleImage}
              alt="img"
              onClick={() => {
                window.open("https://www.google.com/", "_blank");
              }}
            />
            <div className="MainPage_Sponsored_Name_Container">
              <a
                href="https://www.google.com/"
                className="MainPage_Sponsored_Name"
                target="_blank"
                rel="noreferrer"
              >
                Google
              </a>
              <p className="MainPage_Sponsored_Info">
                Best Place To Search Anything
              </p>
              <p className="MainPage_Sponsored_genre">Services</p>
            </div>
          </div>
        </div>
      </>
    );
  } else if (
    mainPageMessageOnOffState ||
    notificationBoxState.open ||
    moreProfileBoxState
  ) {
    return <></>;
  } else {
    return <></>;
  }
};

export default SponsoredBy;
