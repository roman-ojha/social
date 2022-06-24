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
});

export default reducer;
