import React from "react";
import { useSelector } from "react-redux";
import "../styles/react-components/userSuggestionFollowdBySponsoredBy.css";

const SponsoredBy = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );

  const ReturnSponsoredBy = () => {
    if (mainPageMessageOnOffState === false) {
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

export default SponsoredBy;
