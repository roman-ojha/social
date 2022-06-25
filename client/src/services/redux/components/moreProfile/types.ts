export type MoreProfileState = boolean;

export enum MoreProfileActionTypes {
  OPEN_MORE_PROFILE_BOX = "openMoreProfileBox",
}
export interface OpenMoreProfileBox {
  type: MoreProfileActionTypes.OPEN_MORE_PROFILE_BOX;
  payload: MoreProfileState;
}

export type MoreProfileAction = OpenMoreProfileBox;
