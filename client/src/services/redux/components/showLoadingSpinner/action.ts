import {
  ShowLoadingSpinnerAction,
  ShowLoadingSpinnerActionTypes,
  ShowLoadingSpinnerState,
} from "./types";
import { Dispatch } from "react";

export const showLoadingSpinner = (data: ShowLoadingSpinnerState) => {
  return (dispatch: Dispatch<ShowLoadingSpinnerAction>) => {
    dispatch({
      type: ShowLoadingSpinnerActionTypes.SHOW_LOADING_SPINNER,
      payload: data,
    });
  };
};
