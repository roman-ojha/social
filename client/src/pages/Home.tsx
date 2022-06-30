import React from "react";
import "emoji-mart/css/emoji-mart.css";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/pages/homePage.css";
import "../styles/others/emojiMarPacakge.css";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import UserPostField from "../components/HomePage/UserPostField";
import ReturnHomePageFeed from "../components/HomePage/ReturnHomePageFeed";

const Home = (): JSX.Element => {
  return (
    <>
      <LoadingSpinner />
      <main className="HomePage_Container">
        <OpenSideBarDrawerButton />
        <OpenRightPartDrawerButton />
        <div className="HomePage_User_Post_Field_Container">
          <UserPostField />
        </div>
        <ReturnHomePageFeed />
      </main>
    </>
  );
};

export default Home;
