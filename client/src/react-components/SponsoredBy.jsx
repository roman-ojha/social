import React from "react";
import { useSelector } from "react-redux";
import "../styles/react-components/userSuggestionFollowdBySponsoredBy.css";

const SponsoredBy = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const notificationBoxState = useSelector((state) => state.notificationBox);
  const moreProfileBoxState = useSelector(
    (state) => state.moreProfileBoxReducer
  );
  const ReturnSponsoredBy = () => {
    if (
      !mainPageMessageOnOffState &&
      !notificationBoxState &&
      !moreProfileBoxState
    ) {
      return (
        <>
          <div className="MainPage_SponsoredBy_Container">
            <h4 className="MainPage_SponsoredBy_Title">Sponsored By</h4>
            <div className="MainPage_SponsoredBy_Inner_Container">
              <img
                className="MainPage_Sponsored_Image"
                src="https://logowik.com/content/uploads/images/985_google_g_icon.jpg"
                alt=""
              />
              <div className="MainPage_Sponsored_Name_Container">
                <p className="MainPage_Sponsored_Name">Google</p>
                <p className="MainPage_Sponsored_Info">
                  Best Place To Search Anything
                </p>
                <p className="MainPage_Sponsored_genre">Platform</p>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      mainPageMessageOnOffState ||
      notificationBoxState ||
      moreProfileBoxState
    ) {
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
