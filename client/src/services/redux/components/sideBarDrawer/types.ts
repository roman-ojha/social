export type SideBarDrawerState = boolean;

export enum SideBarDrawerActionTypes {
  OPEN_SIDEBAR_DRAWER = "openSideBarDrawer",
}
export interface OpenSideBarDrawer {
  type: SideBarDrawerActionTypes.OPEN_SIDEBAR_DRAWER;
  payload: SideBarDrawerState;
}

export type SideBarDrawerAction = OpenSideBarDrawer;
