import React, { useState } from "react";
import { YoutubeVideos } from "../../interface/youtubeVideos";

interface RenderVideoProps extends YoutubeVideos {}

const RenderVideo: React.FC<RenderVideoProps> = ({
  videoId,
  title,
  thumbnail,
}) => {
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <>
      <div className="VideoPage_Youtube_Video_Info_Container">
        {playVideo ? (
          <iframe
            src={`https://youtube.com/embed/${videoId}`}
            className="VideoPage_Youtube_Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          ></iframe>
        ) : (
          <img
            // src={`http://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`}
            src={thumbnail}
            className="VideoPage_Youtube_Video_Image"
            // alg={props.title}
            onClick={() => {
              setPlayVideo(true);
            }}
            alt=""
          />
        )}
        <h1
          onClick={() => {
            setPlayVideo(true);
          }}
          className="VidePage_Youtube_Video_Title"
        >
          {title}
        </h1>
      </div>
    </>
  );
};

export default RenderVideo;
