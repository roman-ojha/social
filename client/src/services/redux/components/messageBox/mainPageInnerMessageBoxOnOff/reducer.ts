import {
  MainPageInnerMessageBoxOnOffState,
  MainPageInnerMessageBoxOnOffActionTypes,
  MainPageMessageInnerViewOnOffAction,
} from "./types";

const initialState: MainPageInnerMessageBoxOnOffState = false;

const mainPageInnerMessageBoxOnOff = (
  state: MainPageInnerMessageBoxOnOffState = initialState,
  action: MainPageMessageInnerViewOnOffAction
) => {
  if (
    action.type ===
    MainPageInnerMessageBoxOnOffActionTypes.MAIN_PAGE_MESSAGE_INNER_VIEW_ON_OFF
  ) {
    return action.payload;
  } else {
    return state;
  }
};

export default mainPageInnerMessageBoxOnOff;
