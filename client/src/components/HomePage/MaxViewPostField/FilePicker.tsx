import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const imagePickerState = useSelector(
    (state: AppState) => state.imagePickerReducer
  );
  const imagePickingFromState = useSelector(
    (state: AppState) => state.imagePickingFromReducer
  );

  const {
    homePageUserPostFieldDataAction,
    displayUserPostFieldEmojiPicker,
    openImagePicker,
    setImagePickingFrom,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (imagePickingFromState === "homePagePostFiled") {
      var image = document.getElementsByClassName(
        "MaxView_UserPost_Image"
      )[0] as HTMLImageElement;
      if (
        imagePickerState.imageUrl !== null &&
        imagePickerState.imageFile === undefined
      ) {
        image.style.display = "inline";
        image.style.position = "static";
        image.src = imagePickerState.imageUrl;
      } else if (
        imagePickerState.imageUrl === null &&
        imagePickerState.imageFile !== undefined
      ) {
        image.style.display = "inline";
        image.style.position = "static";
        image.src = URL.createObjectURL(imagePickerState.imageFile);
      }
    }
  }, [imagePickerState]);

  return (
    <>
      <div className="HomePage_MaxView_UserPost_Field_Icons_Container">
        <Icon
          className="HomePage_MaxView_UserPost_Field_Icon"
          icon="ic:outline-photo-library"
          onClick={() => {
            openImagePicker(true);
            setImagePickingFrom("homePagePostFiled");
          }}
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
