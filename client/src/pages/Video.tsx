import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/videoPage.css";
import { useDispatch, useSelector } from "react-redux";
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
import { AxiosError } from "axios";
import { YoutubeVideos } from "src/interface/youtubeVideos";

const Video = (): JSX.Element => {
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
  //       setVideoPageData(data.videos);
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
  //   } catch (err) {
  //   }
  // };

  useEffect(() => {
    const getYoutubeHomePageVideo = async (): Promise<void> => {
      try {
        interface Response extends ResponseObject {
          videos: VideoPageState["videos"];
        }
        const resVideos = await videoApi.getYoutubeHomePageVideos();
        const resVideosData: Response = await resVideos.data;
        if (resVideos.status === 200 && resVideosData.success) {
          setVideoPageData({
            fetchedVideos: true,
            searchedVideos: true,
            videos: resVideosData.videos,
          });
        } else {
          toastError("Some thing went wrong, please try again later!!!");
        }
      } catch (error) {
        const err = error as AxiosError;
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
    if (videoPageData.fetchedVideos === false) {
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
  }, [dispatch, videoPageData.fetchedVideos]);
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
        {videoPageData.searchedVideos ? (
          <div className="VideoPage_Videos_Container">
            {videoPageData.videos.map((video: YoutubeVideos, index: number) => {
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
