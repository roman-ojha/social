import {
  ImagePickerAction,
  ImagePickerActionTypes,
  ImagePickerState,
} from "./types";

const initialState: ImagePickerState = {
  openedImagePicker: false,
  imageFile: null,
  imageUrl: null,
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
    case ImagePickerActionTypes.SUBMIT_IMAGE_PICKER:
      return action.payload;
    default:
      return state;
  }
};

export default imagePickerReducer;
