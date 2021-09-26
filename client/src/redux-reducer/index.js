import changeMainPageMessageView from "./mainPageMessageOnOff";
import setUserPostResponseData from "./UserPostResponseData";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  changeMainPageMessageView,
  setUserPostResponseData,
});

export default rootReducers;
