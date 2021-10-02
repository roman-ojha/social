import changeMainPageMessageView from "./mainPageMessageOnOff";
import setUserPostResponseData from "./UserPostResponseData";
import homePageUserPostFieldDataReducer from "./homePageUserPostFieldData";
import setUserMainInformationReducer from "./UserMainInformationReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  changeMainPageMessageView,
  setUserPostResponseData,
  homePageUserPostFieldDataReducer,
  setUserMainInformationReducer,
});

export default rootReducers;
