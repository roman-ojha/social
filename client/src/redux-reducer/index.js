import { combineReducers } from "redux";
import changeMainPageMessageView from "./mainPageMessageOnOff";
import setUserPostResponseData from "./UserPostResponseData";
import homePageUserPostFieldDataReducer from "./homePageUserPostFieldData";
import setUserProfileDetailReducer from "./UserProfileDetailReducer";
import setUserProfilePostReducer from "./UserProfilePostReducer";

const rootReducers = combineReducers({
  changeMainPageMessageView,
  setUserPostResponseData,
  homePageUserPostFieldDataReducer,
  setUserProfileDetailReducer,
  setUserProfilePostReducer,
});

export default rootReducers;
