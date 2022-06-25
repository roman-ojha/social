export type RightPartDrawerState = boolean;

export enum RightPartDrawerActionTypes {
  OPEN_RIGHT_PART_DRAWER = "openRightPartDrawer",
}
export interface OpenRightParDrawer {
  type: RightPartDrawerActionTypes.OPEN_RIGHT_PART_DRAWER;
  payload: RightPartDrawerState;
}

export type RightPartDrawerAction = OpenRightParDrawer;
