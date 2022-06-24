export type HomePagePostFieldViewState = "min" | "max";

export enum HomePagePostFieldViewActionTypes {
  SET_HOME_PAGE_POST_FIELD_VIEW_VALUE = "setHomePagePostFieldViewValue",
}

export interface SetHomePagePostFieldViewAction {
  type: HomePagePostFieldViewActionTypes.SET_HOME_PAGE_POST_FIELD_VIEW_VALUE;
  payload: HomePagePostFieldViewState;
}

export type HomePagePostFieldViewAction = SetHomePagePostFieldViewAction;
