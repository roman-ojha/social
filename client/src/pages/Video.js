import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import OpenSideBarDrawerButton from "../react-components/OpenSideBarDrawerButton";
import Api from "../services/api/pages/Video";

const Video = () => {
  const fetchVideo = async () => {
    try {
      const res = await Api.getVideos();
      const videoList = await res.data;
      console.log(videoList);
    } catch (err) {}
  };
  useEffect(() => {
    fetchVideo();
  }, []);
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
