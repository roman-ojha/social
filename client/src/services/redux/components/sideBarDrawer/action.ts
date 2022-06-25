import {
  SideBarDrawerAction,
  SideBarDrawerActionTypes,
  SideBarDrawerState,
} from "./types";
import { Dispatch } from "react";

export const openSideBarDrawer = (data: SideBarDrawerState) => {
  return (dispatch: Dispatch<SideBarDrawerAction>) => {
    dispatch({
      type: SideBarDrawerActionTypes.OPEN_SIDEBAR_DRAWER,
      payload: data,
    });
  };
};
