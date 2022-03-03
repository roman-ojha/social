import { combineReducers } from "redux";
import changeMainPageMessageView from "./mainPageMessageOnOff";
import setUserPostResponseData from "./UserPostResponseData";
import homePageUserPostFieldDataReducer from "./homePageUserPostFieldData";
import setUserProfileDetailReducer from "./UserProfileDetailReducer";
import setUserProfilePostReducer from "./UserProfilePostReducer";
import profilePageDataReducer from "./profilePageDataReducer";
import setFollowedUserPostDataReducer from "./FollowedUserPostDataReducer";
import setCurrentUserMessageReducer from "./CurrentUserMessageReducer";
import mainPageInnerMessageBoxOnOff from "./mainPageInnerMessageBoxOnOff";
import setUserMessageFieldReducer from "./userMessageFieldReducer";

const rootReducers = combineReducers({
  changeMainPageMessageView,
  setUserPostResponseData,
  homePageUserPostFieldDataReducer,
  setUserProfileDetailReducer,
  setUserProfilePostReducer,
  profilePageDataReducer,
  setFollowedUserPostDataReducer,
  setCurrentUserMessageReducer,
  mainPageInnerMessageBoxOnOff,
  setUserMessageFieldReducer,
});

export default rootReducers;
