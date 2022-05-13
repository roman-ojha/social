import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import Api from "../services/api/pages/Video";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPageData } from "../services/redux-actions";
import { toastError, toastInfo } from "../services/toast";
import { Icon } from "@iconify/react";
import RenderVideo from "../components/VideoPage/RenderVideo";
import SearchForm from "../components/VideoPage/SearchForm";

const Video = () => {
  const dispatch = useDispatch();
  const videoPageData = useSelector((state) => state.videoPageDataReducer);
  const scrapeVideo = async () => {
    try {
      const res = await Api.scrapeVideo();
      const data = await res.data;
      toastInfo(data.msg);
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

  const getYoutubeApiVideo = async () => {
    try {
      const res = await Api.getYoutubeApi();
      const data = await res.data;
      // console.log(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    // backend scraping
    if (videoPageData.length === 0) {
      scrapeVideo();
    }
    // backend youtube api
    // getYoutubeApiVideo();
    //
    // Scrap.scrapeYoutubeHomePage();
  }, []);
  return (
    <>
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
        {videoPageData.length > 0 ? (
          <div className="VideoPage_Videos_Container">
            {videoPageData.map((video, index) => {
              if (video) {
                return (
                  <RenderVideo
                    videoId={video.videoId}
                    title={video.title}
                    key={index}
                  />
                );
              }
            })}
          </div>
        ) : (
          <div className="VideoPage_LoadingSpinner_Container">
            <div className="VideoPage_LoadingSpinner"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Video;
