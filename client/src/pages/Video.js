import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPageData } from "../services/redux-actions";
import { Icon } from "@iconify/react";
import RenderVideo from "../components/VideoPage/RenderVideo";
import SearchForm from "../components/VideoPage/SearchForm";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import { toastError } from "../services/toast";
import videoApi from "../services/api/pages/Video";

const Video = () => {
  const dispatch = useDispatch();
  const videoPageData = useSelector((state) => state.videoPageDataReducer);
  // const scrapeVideo = async () => {
  //   try {
  //     const res = await Api.scrapeVideo();
  //     const data = await res.data;
  //     if (res.status === 200 && data.success)
  //       dispatch(setVideoPageData(data.videos));
  //   } catch (err) {
  //     if (err.response.data.success === false) {
  //       toastError(err.response.data.msg);
  //     } else {
  //       toastError("Some Problem Occur, Please Try again Letter!!!");
  //     }
  //   }
  // };

  // const getYoutubeApiVideo = async () => {
  //   try {
  //     const res = await Api.getYoutubeApi();
  //     const data = await res.data;
  //     // console.log(data);
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };

  const getYoutubeHomePageVideo = async () => {
    try {
      const resVideos = await videoApi.getYoutubeHomePageVideos();
      const resVideosData = await resVideos.data;
      if (resVideos.status === 200 && resVideosData.success) {
        dispatch(setVideoPageData(resVideosData.videos));
      } else {
        toastError("Some thing went wrong, please try again later!!!");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };

  useEffect(() => {
    // get constant value for youtube home page
    if (videoPageData.length === 0) {
      getYoutubeHomePageVideo();
    }

    // backend scraping
    // if (videoPageData.length === 0) {
    //   scrapeVideo();
    // }
    // backend youtube api
    // getYoutubeApiVideo();
    //
    // Scrap.scrapeYoutubeHomePage();
    // toastInfo("Video Page is in development");
  }, []);
  return (
    <>
      <main className="VideoPage">
        <Helmet>
          <title>Video</title>
        </Helmet>
        <header className="VideoPage_Header">
          <OpenSideBarDrawerButton />
          <OpenRightPartDrawerButton />
          <SearchForm />
          <a
            href="https://www.youtube.com"
            target="_blank"
            className="VideoPage_Icon_and_Title"
          >
            <Icon icon="logos:youtube-icon" className="VideoPage_Icon" />
            <h1>Youtube</h1>
          </a>
        </header>
        {videoPageData.length > 0 ? (
          <div className="VideoPage_Videos_Container">
            {videoPageData.map((video, index) => {
              if (video) {
                return (
                  <RenderVideo
                    videoId={video.videoId}
                    title={video.title}
                    thumbnail={video.thumbnail}
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
      </main>
    </>
  );
};

export default Video;
