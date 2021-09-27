import changeMainPageMessageView from "./mainPageMessageOnOff";
import setUserPostResponseData from "./UserPostResponseData";
import homePageUserPostFieldDataReducer from "./homePageUserPostFieldData";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  changeMainPageMessageView,
  setUserPostResponseData,
  homePageUserPostFieldDataReducer,
});

export default rootReducers;
