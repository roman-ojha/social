import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toastError, toastWarn } from "../../services/toast";
import Api from "../../services/api/pages/Video";
import { isEmptyString } from "../../funcs/isEmptyString";
import { setVideoPageData } from "../../services/redux-actions";
import { useDispatch } from "react-redux";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const searchVideo = async (e) => {
    try {
      e.preventDefault();
      if (isEmptyString(value)) {
        toastWarn("Please fill the search field first");
      } else {
        const res = await Api.searchVideo(value);
        const data = await res.data;
        console.log(data);
        if (res.status === 200 && data.success)
          dispatch(setVideoPageData(data.videos));
      }
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
      <form className="VideoPage_Search_Form_Field" onSubmit={searchVideo}>
        <Icon
          icon="bi:search"
          className="VideoPage_Search_Icon"
          onClick={searchVideo}
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
