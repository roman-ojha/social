import {
  MainPageInnerMessageBoxOnOffActionTypes,
  MainPageInnerMessageBoxOnOffState,
  MainPageMessageInnerViewOnOffAction,
} from "./types";
import { Dispatch } from "react";

export const mainPageMessageInnerViewOnOff = (
  data: MainPageInnerMessageBoxOnOffState
) => {
  return (dispatch: Dispatch<MainPageMessageInnerViewOnOffAction>) => {
    dispatch({
      type: MainPageInnerMessageBoxOnOffActionTypes.MAIN_PAGE_MESSAGE_INNER_VIEW_ON_OFF,
      payload: data,
    });
  };
};
