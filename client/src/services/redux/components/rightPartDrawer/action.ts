import {
  RightPartDrawerAction,
  RightPartDrawerActionTypes,
  RightPartDrawerState,
} from "./types";
import { Dispatch } from "react";

export const openRightPartDrawer = (data: RightPartDrawerState) => {
  return (dispatch: Dispatch<RightPartDrawerAction>) => {
    dispatch({
      type: RightPartDrawerActionTypes.OPEN_RIGHT_PART_DRAWER,
      payload: data,
    });
  };
};
