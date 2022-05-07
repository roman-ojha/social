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
import userSuggestionReducer from "./components/userSuggestionReducer";
import followedByUserReducer from "./components/followedByUserReducer";
import messageListReducer from "./messageListReducer";
import commentBoxReducer from "./commentBox";
import progressBarReducer from "./progressBar";
import userStoriesReducer from "./page/stories/userStories";
import sideBarDrawerReducer from "./sideBarDrawer";
import rightPartDrawerReducer from "./rightPartDrawer";
import homePagePostFieldViewValue from "./homePagePostFieldViewValue";
import notificationBox from "./notificationBox";
import moreProfileBoxReducer from "./moreProfile";
import showLoadingSpinnerReducer from "./showLoadingSpinner";
import videoPageDataReducer from "./page/video";

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
  userSuggestionReducer,
  followedByUserReducer,
  messageListReducer,
  commentBoxReducer,
  progressBarReducer,
  userStoriesReducer,
  sideBarDrawerReducer,
  rightPartDrawerReducer,
  homePagePostFieldViewValue,
  notificationBox,
  moreProfileBoxReducer,
  showLoadingSpinnerReducer,
  videoPageDataReducer,
});

export default rootReducers;
