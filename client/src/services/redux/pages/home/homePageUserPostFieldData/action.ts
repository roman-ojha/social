import {
  HomePageUserPostFieldAction,
  HomePageUserPostFieldActionTypes,
  HomePageUserPostFieldState,
} from "./types";
import { Dispatch } from "react";

export const homePageUserPostFieldDataAction = (
  data: HomePageUserPostFieldState
) => {
  return (dispatch: Dispatch<HomePageUserPostFieldAction>) => {
    dispatch({
      type: HomePageUserPostFieldActionTypes.HOME_PAGE_USER_POST_FIELD_DATA,
      payload: data,
    });
  };
};
