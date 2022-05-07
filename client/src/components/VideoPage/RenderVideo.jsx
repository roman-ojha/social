import React, { useState } from "react";

const RenderVideo = (props) => {
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <>
      <div className="VideoPage_Youtube_Video_Info_Container">
        {playVideo ? (
          <iframe
            src={`https://youtube.com/embed/${props.videoId}`}
            className="VideoPage_Youtube_Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={`http://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`}
            className="VideoPage_Youtube_Video_Image"
            alg={props.title}
            onClick={() => {
              setPlayVideo(true);
            }}
          />
        )}
        <h1
          onClick={() => {
            setPlayVideo(true);
          }}
          className="VidePage_Youtube_Video_Title"
        >
          {props.title}
        </h1>
      </div>
    </>
  );
};

export default RenderVideo;
