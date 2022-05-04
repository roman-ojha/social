import React from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import OpenSideBarDrawerButton from "../react-components/OpenSideBarDrawerButton";

const Video = () => {
  return (
    <>
      <div className="VideoPage_Container">
        <Helmet>
          <title>Video</title>
        </Helmet>
        <OpenSideBarDrawerButton />
        <h1>Under </h1>
        <h1>Development...</h1>
      </div>
    </>
  );
};

export default Video;
