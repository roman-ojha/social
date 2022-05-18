import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toastError, toastWarn } from "../../services/toast";
import Api from "../../services/api/pages/Video";
import { isEmptyString } from "../../funcs/isEmptyString";
import { setVideoPageData } from "../../services/redux-actions";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const form = useRef(null);

  const searchVideo = async () => {
    try {
      dispatch(setVideoPageData([]));
      if (isEmptyString(value)) {
        toastWarn("Please fill the search field first");
      } else {
        // const res = await Api.scrapVideoSearch(value);
        const res = await Api.searchYoutubeVideo(value);
        const data = await res.data;
        if (res.status === 200 && data.success) {
          const newVideos = data.videos.map((video) => {
            return {
              ...video,
              videoId: video.id,
              thumbnail: `http://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
            };
          });
          dispatch(setVideoPageData(newVideos));
        } else {
          toastError(data.msg);
        }
      }
      form.current.reset();
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again Letter!!!");
      }
    }
  };
  return (
    <>
      <form
        ref={form}
        className="VideoPage_Search_Form_Field"
        onSubmit={(e) => {
          e.preventDefault();
          searchVideo();
          setValue("");
        }}
      >
        <Icon
          icon="bi:search"
          className="VideoPage_Search_Icon"
          onClick={() => {
            searchVideo();
            setValue("");
          }}
        />
        <input
          className="VideoPage_Search_Input_Field"
          type="text"
          placeholder="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </form>
    </>
  );
};

export default SearchForm;
