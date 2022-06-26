import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import { useDispatch, useSelector } from "react-redux";
// import { setVideoPageData } from "../services/redux-actions";
import { Icon } from "@iconify/react";
import RenderVideo from "../components/VideoPage/RenderVideo";
import SearchForm from "../components/VideoPage/SearchForm";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import { toastError } from "../services/toast";
import videoApi from "../services/api/pages/Video";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../services/redux";
import ResponseObject from "src/interface/responseObject";
import { VideoPageState } from "src/services/redux/pages/video/types";

const Video = () => {
  const dispatch = useDispatch();
  const videoPageData = useSelector(
    (state: AppState) => state.videoPageDataReducer
  );
  const { setVideoPageData } = bindActionCreators(actionCreators, dispatch);
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

  useEffect(() => {
    const getYoutubeHomePageVideo = async () => {
      try {
        interface Response extends ResponseObject {
          videos: VideoPageState[];
        }
        const resVideos = await videoApi.getYoutubeHomePageVideos();
        const resVideosData: Response = await resVideos.data;
        if (resVideos.status === 200 && resVideosData.success) {
          // dispatch(setVideoPageData(resVideosData.videos));
          setVideoPageData(resVideosData.videos);
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
  }, [dispatch, videoPageData.length]);
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
            rel="noreferrer"
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
              return <></>;
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
