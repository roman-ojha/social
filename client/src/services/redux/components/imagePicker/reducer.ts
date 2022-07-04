import {
  ImagePickerAction,
  ImagePickerActionTypes,
  ImagePickerState,
} from "./types";

const initialState: ImagePickerState = {
  openedImagePicker: false,
};

const imagePickerReducer = (
  state: ImagePickerState = initialState,
  action: ImagePickerAction
): ImagePickerState => {
  switch (action.type) {
    case ImagePickerActionTypes.OPEN_IMAGE_PICKER:
      return {
        ...state,
        openedImagePicker: action.payload,
      };
    default:
      return state;
  }
};

export default imagePickerReducer;
