export type ImagePickingFromState =
  | "homePagePostFiled"
  | "getUserIDPage"
  | null;

export enum ImagePickingFromActionTypes {
  SET_IMAGE_PICKING_FROM = "setImagePickingFrom",
}

export interface SetImagePickingFromAction {
  type: ImagePickingFromActionTypes.SET_IMAGE_PICKING_FROM;
  payload: ImagePickingFromState;
}

export type ImagePickingFromAction = SetImagePickingFromAction;
