export type MainPageMessageOnOffState = boolean;

export enum MainPageMessageOnOffActionTypes {
  MAIN_PAGE_MESSAGE_VIEW_ON_OFF = "MainPageMessageViewOnOf",
}
export interface MainPageMessageViewOnOff {
  type: MainPageMessageOnOffActionTypes.MAIN_PAGE_MESSAGE_VIEW_ON_OFF;
  payload: MainPageMessageOnOffState;
}

export type MainPageMessageViewOnOffAction = MainPageMessageViewOnOff;
