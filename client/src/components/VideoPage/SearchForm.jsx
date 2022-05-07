import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toastError } from "../../services/toast";
import Api from "../../services/api/pages/Video";

const SearchForm = () => {
  const [value, setValue] = useState("");
  const searchVideo = async (e) => {
    try {
      const res = await Api.searchVideo(value);
      console.log(await res.data);
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again Letter!!!");
      }
    }
    e.preventDefault();
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
