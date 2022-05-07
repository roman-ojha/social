import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import Api from "../services/api/pages/Video";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPageData } from "../services/redux-actions";
import { toastError } from "../services/toast";
import { Icon } from "@iconify/react";
import RenderVideo from "../components/VideoPage/RenderVideo";

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
      {videoPageData.length > 0 ? (
        <div className="VideoPage">
          <Helmet>
            <title>Video</title>
          </Helmet>
          <header className="VideoPage_Header">
            <form className="VideoPage_Search_Form_Field">
              <Icon icon="bi:search" className="VideoPage_Search_Icon" />
              <input
                className="VideoPage_Search_Input_Field"
                type="text"
                placeholder="search"
              ></input>
            </form>
            <span className="VideoPage_Icon_and_Title">
              <Icon icon="logos:youtube-icon" className="VideoPage_Icon" />
              <h1>Youtube</h1>
            </span>
          </header>
          <div className="VideoPage_Videos_Container">
            {videoPageData.map((video, index) => {
              return (
                <RenderVideo videoId={video.videoId} title={video.title} />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="VideoPage_LoadingSpinner_Container">
          <div className="VideoPage_LoadingSpinner"></div>
        </div>
      )}
    </>
  );
};

export default Video;
