import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/components/imagePicker.css";
import { Icon } from "@iconify/react";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { toastWarn } from "src/services/toast";
import { Button } from "@mui/material";
import constant from "../constant/constant";

const ReturnImagePicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const imagePickerState = useSelector(
    (state: AppState) => state.imagePickerReducer
  );
  const { openImagePicker, submitImagePicker } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageUrl, setIsImageUrl] = useState<boolean>(false);
  const [isImageFile, setIsImageFile] = useState<boolean>(false);
  const imagePreviewElement: React.MutableRefObject<null | HTMLDivElement> =
    useRef(null);
  const imagePreviewH1Element: React.MutableRefObject<null | HTMLHeadingElement> =
    useRef(null);
  const imageElement: React.MutableRefObject<HTMLImageElement> = useRef(
    document.createElement("img")
  );
  imageElement.current.className = "ImagePicker_Content_Preview_ImgElement";
  const inputFileElement: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  const getFile = () => {
    if (
      inputFileElement.current?.files !== null &&
      imagePreviewH1Element.current !== null
    ) {
      const file = inputFileElement.current?.files[0];
      imageElement.current.src = URL.createObjectURL(file!);
      imagePreviewH1Element.current.replaceWith(imageElement.current);
      setIsImageFile(true);
    }
  };

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
        if (
          inputFileElement.current?.files !== null &&
          inputFileElement.current?.files?.length !== 0 &&
          imagePreviewH1Element.current !== null
        ) {
          const file = inputFileElement.current?.files[0];
          imageElement.current.src = URL.createObjectURL(file!);
          imagePreviewH1Element.current.replaceWith(imageElement.current);
        } else if (
          imagePreviewH1Element.current !== null &&
          inputFileElement.current?.files?.length === 0
        ) {
          imageElement.current.replaceWith(
            imagePreviewH1Element.current as Node
          );
        }
        setIsImageUrl(false);
      };
    } catch (err) {}
  }, [imageUrl]);

  const submitImage = () => {
    if (isImageUrl === false && isImageFile === false) {
      toastWarn(
        "Please select either imageUrl or imageFile, Non of them are selected"
      );
    } else if (isImageUrl && !isImageFile) {
      submitImagePicker({
        imageFile: undefined,
        imageUrl,
        openedImagePicker: false,
      });
    } else if (
      !isImageUrl &&
      isImageFile &&
      inputFileElement.current?.files !== null
    ) {
      submitImagePicker({
        imageFile: inputFileElement.current?.files[0],
        imageUrl: null,
        openedImagePicker: false,
      });
    } else if (
      isImageUrl &&
      isImageFile &&
      inputFileElement.current?.files !== null
    ) {
      submitImagePicker({
        imageFile: inputFileElement.current?.files[0],
        imageUrl: null,
        openedImagePicker: false,
      });
    }
  };

  return (
    <>
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
            <h2>NOTE : {constant.imagePickingMessage}</h2>
          </div>

          <div className="ImagePicker_File_Picker_Container">
            <div className="ImagePicker_File_Picker_Label_Container">
              <Icon icon="fa:upload" />
              <label htmlFor="image-picker-file-picker">upload img</label>
            </div>
            <input
              type="file"
              id="image-picker-file-picker"
              className="ImagePicker_File_Picker_Field"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              ref={inputFileElement}
              onChange={getFile}
            />
          </div>
          <div
            className="ImagePicker_Content_Preview"
            ref={imagePreviewElement}
          >
            <h3 ref={imagePreviewH1Element}>Preview</h3>
          </div>
          <Button id="ImagePicker_Submit_Button" onClick={submitImage}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

const ImagePicker = (): JSX.Element => {
  const imagePickerState = useSelector(
    (state: AppState) => state.imagePickerReducer
  );
  return ReactDOM.createPortal(
    <>{imagePickerState.openedImagePicker ? <ReturnImagePicker /> : <></>}</>,
    document.getElementById("portal-root") as HTMLElement
  );
};

export default ImagePicker;
