import { ProgressBarAction, ProgressBarActionTypes } from "./types";
import { Dispatch } from "react";

export const stopProgressBar = () => {
  return (dispatch: Dispatch<ProgressBarAction>) => {
    dispatch({
      type: ProgressBarActionTypes.STOP_PROGRESS_BAR,
    });
  };
};

export const startProgressBar = () => {
  return (dispatch: Dispatch<ProgressBarAction>) => {
    dispatch({
      type: ProgressBarActionTypes.START_PROGRESS_BAR,
    });
  };
};

export const hideProgressBar = () => {
  return (dispatch: Dispatch<ProgressBarAction>) => {
    dispatch({
      type: ProgressBarActionTypes.HIDE_PROGRESS_BAR,
    });
  };
};
