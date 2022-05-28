import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  profilePageDataAction,
  setRootUserProfileDataState,
  userPostResponseData,
  homePageUserPostFieldDataAction,
  showLoadingSpinner,
  setHomePagePostFieldViewValue,
} from "../../../services/redux-actions";
import User_Profile_Icon from "../../../assets/svg/User_profile_Icon.svg";
import { Picker } from "emoji-mart";
import { Icon } from "@iconify/react";
import Api from "../../../services/api/pages/homeApi";
import { toastError, toastSuccess, toastInfo } from "../../../services/toast";

const FilePicker = () => {
  const dispatch = useDispatch();
  const getUserPostFiledImage = (event) => {
    try {
      var image = document.getElementsByClassName("MaxView_UserPost_Image")[0];
      image.style.display = "inline";
      image.style.position = "static";
      image.src = URL.createObjectURL(event.target.files[0]);
    } catch (err) {}
  };
  return (
    <>
      <div className="HomePage_MaxView_UserPost_Field_Icons_Container">
        <label htmlFor="image-input">
          <Icon
            className="HomePage_MaxView_UserPost_Field_Icon"
            icon="ic:outline-photo-library"
          />
        </label>
        <input
          id="image-input"
          type="file"
          style={{ visibility: "hidden" }}
          onChange={getUserPostFiledImage}
          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
          name="image"
        />
        <Icon
          className="HomePage_MaxView_UserPost_Field_Icon"
          icon="ic:outline-video-library"
          onClick={() => {
            toastInfo(
              "Video upload is not supported right now, please upload images"
            );
          }}
        />
        <Icon
          className="HomePage_MaxView_UserPost_Field_Emoji_Icon"
          icon="entypo:emoji-happy"
          onClick={() => {
            dispatch(
              homePageUserPostFieldDataAction({
                ...homePageUserPostFieldData,
                content: userPostData,
              })
            );
            homePageUserPostEmojiView
              ? setHomePageUserPostEmojiView(false)
              : setHomePageUserPostEmojiView(true);
          }}
        />
      </div>
    </>
  );
};

export default FilePicker;
