import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import OpenSideBarDrawerButton from "../react-components/OpenSideBarDrawerButton";
import Api from "../services/api/pages/Video";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPageData } from "../redux-actions";
import { toastError } from "../services/toast";

const Video = () => {
  const dispatch = useDispatch();
  const videoPageData = useSelector((state) => state.videoPageDataReducer);
  console.log(videoPageData);
  const fetchVideo = async () => {
    try {
      const res = await Api.getVideos();
      const data = await res.data;
      if (res.status === 200 && data.success)
        dispatch(setVideoPageData(data.videos));
    } catch (err) {
      toastError(err.response.data.msg);
    }
  };
  useEffect(() => {
    if (videoPageData.length === 0) {
      fetchVideo();
    }
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