export interface ProgressBarState {
  showProgressBar: boolean;
  isCompleted: boolean;
}

export enum ProgressBarActionTypes {
  STOP_PROGRESS_BAR = "stopProgressBar",
  START_PROGRESS_BAR = "startProgressBar",
  HIDE_PROGRESS_BAR = "hideProgressBar",
}
export interface StopProgressBar {
  type: ProgressBarActionTypes.STOP_PROGRESS_BAR;
}

export interface StartProgressBar {
  type: ProgressBarActionTypes.START_PROGRESS_BAR;
}

export interface HideProgressBar {
  type: ProgressBarActionTypes.HIDE_PROGRESS_BAR;
}

export type ProgressBarAction =
  | StopProgressBar
  | StartProgressBar
  | HideProgressBar;
