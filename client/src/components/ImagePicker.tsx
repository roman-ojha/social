import React, { useEffect, useRef, useState } from "react";
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
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageUrl, setIsImageUrl] = useState<boolean>(false);
  const imagePreviewElement: React.MutableRefObject<null | HTMLDivElement> =
    useRef(null);
  const imagePreviewH1Element: React.MutableRefObject<null | HTMLHeadingElement> =
    useRef(null);
  const imageElement: React.MutableRefObject<HTMLImageElement> = useRef(
    document.createElement("img")
  );
  imageElement.current.className = "ImagePicker_Content_Preview_ImgElement";

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

  useEffect(() => {
    try {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        // if url is image
        imageElement.current.setAttribute("src", imageUrl);
        if (imagePreviewH1Element.current !== null) {
          imageElement.current.src = imageUrl;
          imagePreviewH1Element.current.replaceWith(imageElement.current);
        }
        setIsImageUrl(true);
      };
      img.onerror = () => {
        if (imagePreviewH1Element !== null) {
          imageElement.current.replaceWith(
            imagePreviewH1Element.current as Node
          );
        }
      };
    } catch (err) {}
  }, [imageUrl]);

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
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                value={imageUrl}
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
            <div
              className="ImagePicker_Content_Preview"
              ref={imagePreviewElement}
            >
              <h3 ref={imagePreviewH1Element}>Preview</h3>
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
