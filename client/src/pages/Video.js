import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import Api from "../services/api/pages/Video";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPageData } from "../services/redux-actions";
import { toastError } from "../services/toast";
import { Icon } from "@iconify/react";

const Video = () => {
  const dispatch = useDispatch();
  const videoPageData = useSelector((state) => state.videoPageDataReducer);
  console.log(videoPageData);
  const fetchVideo = async () => {
    try {
      const res = await Api.getVideos();
      const data = await res.data;
      if (res.status === 200 && data.success)
        dispatch(setVideoPageData(data.data));
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
      <div className="VideoPage">
        <Helmet>
          <title>Video</title>
        </Helmet>
        <header className="VideoPage_Header">
          <span className="VideoPage_Icon_and_Title">
            <Icon icon="logos:youtube-icon" className="VideoPage_Icon" />
            <h1>Youtube</h1>
          </span>
          <form>
            <input type="text" placeholder="search"></input>
          </form>
        </header>
        <div className="VideoPage_Videos_Container">
          {videoPageData.map((videoId, index) => {
            return (
              <div
                key={index}
                className="VideoPage_Youtube_Video_Info_Container"
              >
                {/* <iframe
                  src={`https://youtube.com/embed/${videoId}`}
                  className="VideoPage_Youtube_Video"
                  frameBorder="0"
                  allow="accelerometer;clipboard-write;encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe> */}
                <img
                  src={`http://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  className="VideoPage_Youtube_Video_Image"
                  // frameBorder="0"
                  // allow="accelerometer;clipboard-write;encrypted-media; gyroscope; picture-in-picture"
                  // allowFullScreen
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Video;
