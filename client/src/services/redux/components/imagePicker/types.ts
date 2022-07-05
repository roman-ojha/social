export interface ImagePickerState {
  openedImagePicker: boolean;
  imageUrl: null | string;
  imageFile: undefined | File;
}

export enum ImagePickerActionTypes {
  OPEN_IMAGE_PICKER = "openImagePicker",
  SUBMIT_IMAGE_PICKER = "submitImagePicker",
}

export interface OpenImagePickerAction {
  type: ImagePickerActionTypes.OPEN_IMAGE_PICKER;
  payload: ImagePickerState["openedImagePicker"];
}

export interface SubmitImagePickerAction {
  type: ImagePickerActionTypes.SUBMIT_IMAGE_PICKER;
  payload: ImagePickerState;
}

export type ImagePickerAction = OpenImagePickerAction | SubmitImagePickerAction;
