import {
  HomePagePostFieldViewAction,
  HomePagePostFieldViewActionTypes,
  HomePagePostFieldViewState,
} from "./types";
import { Dispatch } from "react";

export const setHomePagePostFieldViewValue = (
  data: HomePagePostFieldViewState
) => {
  return (dispatch: Dispatch<HomePagePostFieldViewAction>) => {
    dispatch({
      type: HomePagePostFieldViewActionTypes.SET_HOME_PAGE_POST_FIELD_VIEW_VALUE,
      payload: data,
    });
  };
};
