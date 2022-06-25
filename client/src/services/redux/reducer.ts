import { combineReducers } from "redux";
import setUserProfileDetailReducer from "./global/rootUserProfileDetail/reducer";
import rootUserFriendsReducer from "./global/rootUserFriends/reducer";
import commentBoxReducer from "./components/commentBox/reducer";
import followedByUserReducer from "./components/followedByUser/reducer";
import notificationBoxReducer from "./components/notificationBox/reducer";
import videoPageDataReducer from "./pages/video/reducer";
import userStoriesReducer from "./pages/stories/reducer";
import profilePageDataReducer from "./pages/profile/profilePageData/reducer";
import rootUserProfileDataState from "./pages/profile/rootUserProfileData/reducer";
import setUserProfilePostReducer from "./pages/profile/userProfilePost/reducer";
import displayEmojiPicker from "./pages/home/emojiPicker/reducer";
import setFollowedUserPostDataReducer from "./pages/home/followedUserPostData/reducer";
import homePagePostFieldViewValue from "./pages/home/homePagePostFieldViewValue/reducer";
import homePageUserPostFieldDataReducer from "./pages/home/homePageUserPostFieldData/reducer";
import setUserPostResponseData from "./pages/home/userPostResponseData/reducer";
import progressBarReducer from "./components/progressBar/reducer";
import rightPartDrawerReducer from "./components/rightPartDrawer/reducer";

const reducer = combineReducers({
  setUserProfileDetailReducer,
  rootUserFriendsReducer,
  commentBoxReducer,
  notificationBoxReducer,
  videoPageDataReducer,
  userStoriesReducer,
  followedByUserReducer,
  profilePageDataReducer,
  rootUserProfileDataState,
  setUserProfilePostReducer,
  displayEmojiPicker,
  setFollowedUserPostDataReducer,
  homePagePostFieldViewValue,
  homePageUserPostFieldDataReducer,
  setUserPostResponseData,
  progressBarReducer,
  rightPartDrawerReducer,
});

export default reducer;
