import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  homePageUserPostFieldDataAction,
  displayUserPostFieldEmojiPicker,
} from "../../../services/redux-actions";
import { Icon } from "@iconify/react";
import { toastInfo } from "../../../services/toast";

const FilePicker = () => {
  const dispatch = useDispatch();
  const displayEmojiPicker = useSelector((state) => state.displayEmojiPicker);
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });

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
                content: homePageUserPostFieldData.content,
              })
            );
            dispatch(displayUserPostFieldEmojiPicker(!displayEmojiPicker));
          }}
        />
      </div>
    </>
  );
};

export default FilePicker;
