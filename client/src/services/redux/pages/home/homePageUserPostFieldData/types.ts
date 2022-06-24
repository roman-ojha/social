export interface HomePageUserPostFieldState {
  content: string;
  image: object;
}

export enum HomePageUserPostFieldActionTypes {
  HOME_PAGE_USER_POST_FIELD_DATA = "homePageUserPostFieldData",
}

export interface HomePageUserPostFieldDataAction {
  type: HomePageUserPostFieldActionTypes.HOME_PAGE_USER_POST_FIELD_DATA;
  payload: HomePageUserPostFieldState;
}

export type HomePageUserPostFieldAction = HomePageUserPostFieldDataAction;
