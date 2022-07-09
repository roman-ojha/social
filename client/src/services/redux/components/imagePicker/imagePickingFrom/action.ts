import {
  ImagePickingFromAction,
  ImagePickingFromActionTypes,
  ImagePickingFromState,
} from "./types";
import { Dispatch } from "react";

export const setImagePickingFrom = (data: ImagePickingFromState) => {
  return (dispatch: Dispatch<ImagePickingFromAction>) => {
    dispatch({
      type: ImagePickingFromActionTypes.SET_IMAGE_PICKING_FROM,
      payload: data,
    });
  };
};
