import {
  ProgressBarAction,
  ProgressBarActionTypes,
  ProgressBarState,
} from "./types";

const initialState: ProgressBarState = {
  showProgressBar: false,
  isCompleted: false,
};

const progressBarReducer = (
  state: ProgressBarState = initialState,
  action: ProgressBarAction
) => {
  switch (action.type) {
    case ProgressBarActionTypes.START_PROGRESS_BAR:
      return {
        isCompleted: false,
        showProgressBar: true,
      };
    case ProgressBarActionTypes.STOP_PROGRESS_BAR:
      return {
        showProgressBar: true,
        isCompleted: true,
      };
    case ProgressBarActionTypes.HIDE_PROGRESS_BAR:
      return {
        showProgressBar: false,
        isCompleted: false,
      };
    default:
      return state;
  }
};

export default progressBarReducer;
