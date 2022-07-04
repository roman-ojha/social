import {
  ImagePickerAction,
  ImagePickerActionTypes,
  ImagePickerState,
} from "./types";
import { Dispatch } from "react";

export const openImagePicker = (
  data: ImagePickerState["openedImagePicker"]
) => {
  return (dispatch: Dispatch<ImagePickerAction>) => {
    dispatch({
      type: ImagePickerActionTypes.OPEN_IMAGE_PICKER,
      payload: data,
    });
  };
};
