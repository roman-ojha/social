export interface ImagePickerState {
  openedImagePicker: boolean;
}

export enum ImagePickerActionTypes {
  OPEN_IMAGE_PICKER = "openImagePicker",
}
export interface OpenImagePickerAction {
  type: ImagePickerActionTypes.OPEN_IMAGE_PICKER;
  payload: ImagePickerState["openedImagePicker"];
}

export type ImagePickerAction = OpenImagePickerAction;
