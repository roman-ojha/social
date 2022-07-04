import React, { useEffect } from "react";
import "../styles/components/imagePicker.css";
import { Icon } from "@iconify/react";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

const ImagePicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const imagePickerState = useSelector(
    (state: AppState) => state.imagePickerReducer
  );
  const { openImagePicker } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (imagePickerState.openedImagePicker === true) {
      document
        .getElementById("image-picker-page")!
        .addEventListener("click", (e: MouseEvent) => {
          if (
            !document
              .getElementById("image-picker-content-container")!
              .contains(e.target as Node)
          ) {
            document
              .getElementById("image-picker-page")!
              .removeEventListener("click", () => {});
            openImagePicker(false);
          }
        });
    }
  }, [imagePickerState.openedImagePicker]);

  return (
    <>
      {imagePickerState.openedImagePicker ? (
        <div className="ImagePicker_Page" id="image-picker-page">
          <div
            className="ImagePicker_Content_Container"
            id="image-picker-content-container"
          >
            <div className="ImagePicker_Image_Url_Container">
              <input
                type="text"
                className="ImagePicker_Image_Url_Field"
                placeholder="image url"
              />
              <h2>
                NOTE : Consider using image url rather then uploading files
                because cloud database have limited Storage
              </h2>
            </div>

            <div className="ImagePicker_File_Picker_Container">
              <div className="ImagePicker_File_Picker_Label_Container">
                <Icon icon="fa:upload" />
                <label htmlFor="image-picker-file-picker">upload file</label>
              </div>
              <input
                type="file"
                id="image-picker-file-picker"
                className="ImagePicker_File_Picker_Field"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              />
            </div>
            <div className="ImagePicker_Content_Preview">
              <h3>Preview</h3>
            </div>
            <button className="ImagePicker_Submit_Button">Submit</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ImagePicker;
