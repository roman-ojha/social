import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   homePageUserPostFieldDataAction,
//   displayUserPostFieldEmojiPicker,
// } from "../../../services/redux-actions";
import { Icon } from "@iconify/react";
import { toastInfo } from "../../../services/toast";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../services/redux";

const FilePicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const displayEmojiPicker = useSelector(
    (state: AppState) => state.displayEmojiPicker
  );
  const homePageUserPostFieldData = useSelector((state: AppState) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const { homePageUserPostFieldDataAction, displayUserPostFieldEmojiPicker } =
    bindActionCreators(actionCreators, dispatch);

  const getUserPostFiledImage = (event): void => {
    try {
      var image = document.getElementsByClassName(
        "MaxView_UserPost_Image"
      )[0] as HTMLImageElement;
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
            homePageUserPostFieldDataAction({
              ...homePageUserPostFieldData,
              content: homePageUserPostFieldData.content,
            });
            displayUserPostFieldEmojiPicker(!displayEmojiPicker);
          }}
        />
      </div>
    </>
  );
};

export default FilePicker;
