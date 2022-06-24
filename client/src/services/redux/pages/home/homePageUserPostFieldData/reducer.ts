import {
  HomePageUserPostFieldAction,
  HomePageUserPostFieldActionTypes,
  HomePageUserPostFieldState,
} from "./types";

const initialState: HomePageUserPostFieldState = {
  content: "",
  image: {},
};

const homePageUserPostFieldDataReducer = (
  state: HomePageUserPostFieldState = initialState,
  action: HomePageUserPostFieldAction
) => {
  switch (action.type) {
    case HomePageUserPostFieldActionTypes.HOME_PAGE_USER_POST_FIELD_DATA:
      const { content, image } = action.payload;
      return {
        content,
        image,
      };
    default:
      return state;
  }
};

export default homePageUserPostFieldDataReducer;
