export type ShowLoadingSpinnerState = boolean;

export enum ShowLoadingSpinnerActionTypes {
  SHOW_LOADING_SPINNER = "showLoadingSpinner",
}
export interface ShowLoadingSpinner {
  type: ShowLoadingSpinnerActionTypes.SHOW_LOADING_SPINNER;
  payload: ShowLoadingSpinnerState;
}

export type ShowLoadingSpinnerAction = ShowLoadingSpinner;
