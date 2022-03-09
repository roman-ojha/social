import React from "react";
import MessageBox from "./MessageBox";
import UserSuggestion from "./UserSuggestion";
import FollowedBy from "./FollowedBy";
import SponsoredBy from "./SponsoredBy";

const MainPageRightSideComp = () => {
  return (
    <>
      <div className="MainPage_Rignt_Side_Component_Container">
        <MessageBox />
        <UserSuggestion />
        <FollowedBy />
        <SponsoredBy />
      </div>
    </>
  );
};

export default MainPageRightSideComp;
