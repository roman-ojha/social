import {
  MainPageMessageOnOffActionTypes,
  MainPageMessageOnOffState,
  MainPageMessageViewOnOffAction,
} from "./types";
import { Dispatch } from "react";

export const mainPageMessageViewOnOff = (data: MainPageMessageOnOffState) => {
  return (dispatch: Dispatch<MainPageMessageViewOnOffAction>) => {
    dispatch({
      type: MainPageMessageOnOffActionTypes.MAIN_PAGE_MESSAGE_VIEW_ON_OFF,
      payload: data,
    });
  };
};
