import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import Api from "../services/api/pages/Video";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPageData } from "../services/redux-actions";
import { toastError } from "../services/toast";
import { Icon } from "@iconify/react";
import RenderVideo from "../components/VideoPage/RenderVideo";
import SearchForm from "../components/VideoPage/SearchForm";

const Video = () => {
  const dispatch = useDispatch();
  const videoPageData = useSelector((state) => state.videoPageDataReducer);
  const fetchVideo = async () => {
    try {
      const res = await Api.getVideos();
      const data = await res.data;
      if (res.status === 200 && data.success)
        dispatch(setVideoPageData(data.videos));
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again Letter!!!");
      }
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
            <SearchForm />
            <span className="VideoPage_Icon_and_Title">
              <Icon icon="logos:youtube-icon" className="VideoPage_Icon" />
              <h1>Youtube</h1>
            </span>
          </header>
          <div className="VideoPage_Videos_Container">
            {videoPageData.map((video, index) => {
              return (
                <RenderVideo
                  videoId={video.videoId}
                  title={video.title}
                  key={index}
                />
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
