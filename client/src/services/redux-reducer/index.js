import { combineReducers } from "redux";
import changeMainPageMessageView from "./components/messageBox/mainPageMessageOnOff";
import setUserPostResponseData from "./page/home/UserPostResponseData";
import homePageUserPostFieldDataReducer from "./page/home/homePageUserPostFieldData";
import setUserProfileDetailReducer from "./global/UserProfileDetailReducer";
import setUserProfilePostReducer from "./page/profile/UserProfilePostReducer";
import profilePageDataReducer from "./page/profile/profilePageDataReducer";
import setFollowedUserPostDataReducer from "./page/home/FollowedUserPostDataReducer";
import setCurrentUserMessageReducer from "./components/messageBox/CurrentUserMessageReducer";
import mainPageInnerMessageBoxOnOff from "./components/messageBox/mainPageInnerMessageBoxOnOff";
import setUserMessageFieldReducer from "./userMessageFieldReducer";
import userSuggestionReducer from "./components/userSuggestionReducer";
import followedByUserReducer from "./components/followedByUserReducer";
import messageListReducer from "./components/messageBox/messageListReducer";
import commentBoxReducer from "./components/commentBox";
import progressBarReducer from "./components/progressBar";
import userStoriesReducer from "./page/stories/userStories";
import sideBarDrawerReducer from "./components/sideBarDrawer";
import rightPartDrawerReducer from "./components/rightPartDrawer";
import homePagePostFieldViewValue from "./page/home/homePagePostFieldViewValue";
import notificationBox from "./components/notificationBox";
import moreProfileBoxReducer from "./components/moreProfile";
import showLoadingSpinnerReducer from "./components/showLoadingSpinner";
import videoPageDataReducer from "./page/video";
import rootUserFriends from "./global/rootUserFriends";
import rootUserProfileDataState from "./page/profile/rootUserProfileDataState";
import displayEmojiPicker from "./page/home/displayEmojiPicker";

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
  rootUserFriends,
  rootUserProfileDataState,
  displayEmojiPicker,
});

export default rootReducers;
