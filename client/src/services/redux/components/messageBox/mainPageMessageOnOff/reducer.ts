import {
  MainPageMessageOnOffActionTypes,
  MainPageMessageOnOffState,
  MainPageMessageViewOnOffAction,
} from "./types";

const initialState: MainPageMessageOnOffState = false;

const changeMainPageMessageView = (
  state: MainPageMessageOnOffState = initialState,
  action: MainPageMessageViewOnOffAction
) => {
  if (
    action.type ===
    MainPageMessageOnOffActionTypes.MAIN_PAGE_MESSAGE_VIEW_ON_OFF
  ) {
    return action.payload;
  } else {
    return state;
  }
};

export default changeMainPageMessageView;
