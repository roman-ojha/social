export type MainPageInnerMessageBoxOnOffState = boolean;

export enum MainPageInnerMessageBoxOnOffActionTypes {
  MAIN_PAGE_MESSAGE_INNER_VIEW_ON_OFF = "mainPageMessageInnerViewOnOff",
}
export interface MainPageMessageInnerViewOnOff {
  type: MainPageInnerMessageBoxOnOffActionTypes.MAIN_PAGE_MESSAGE_INNER_VIEW_ON_OFF;
  payload: MainPageInnerMessageBoxOnOffState;
}

export type MainPageMessageInnerViewOnOffAction = MainPageMessageInnerViewOnOff;
