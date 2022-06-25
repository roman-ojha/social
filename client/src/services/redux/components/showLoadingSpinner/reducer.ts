import {
  ShowLoadingSpinnerAction,
  ShowLoadingSpinnerActionTypes,
  ShowLoadingSpinnerState,
} from "./types";

const initialState: ShowLoadingSpinnerState = false;

const showLoadingSpinnerReducer = (
  state: ShowLoadingSpinnerState = initialState,
  action: ShowLoadingSpinnerAction
) => {
  if (action.type === ShowLoadingSpinnerActionTypes.SHOW_LOADING_SPINNER)
    return action.payload;
  else return state;
};

export default showLoadingSpinnerReducer;
