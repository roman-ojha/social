import {
  ImagePickingFromAction,
  ImagePickingFromActionTypes,
  ImagePickingFromState,
} from "./types";

const initialState: ImagePickingFromState = undefined;

const imagePickerReducer = (
  state: ImagePickingFromState = initialState,
  action: ImagePickingFromAction
): ImagePickingFromState => {
  switch (action.type) {
    case ImagePickingFromActionTypes.SET_IMAGE_PICKING_FROM:
      return action.payload;
    default:
      return state;
  }
};

export default imagePickerReducer;
