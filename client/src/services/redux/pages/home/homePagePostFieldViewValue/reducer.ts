import {
  HomePagePostFieldViewAction,
  HomePagePostFieldViewActionTypes,
  HomePagePostFieldViewState,
} from "./types";

const initialState: HomePagePostFieldViewState = "min";

const homePagePostFieldViewValue = (
  state: HomePagePostFieldViewState = initialState,
  action: HomePagePostFieldViewAction
) => {
  switch (action.type) {
    case HomePagePostFieldViewActionTypes.SET_HOME_PAGE_POST_FIELD_VIEW_VALUE:
      return action.payload;
    default:
      return state;
  }
};

export default homePagePostFieldViewValue;
