import { combineReducers } from "redux";
import setUserProfileDetailReducer from "./global/rootUserProfileDetail/reducer";
import rootUserFriendsReducer from "./global/rootUserFriends/reducer";
import commentBoxReducer from "./components/commentBox/reducer";
import notificationBoxReducer from "./components/notificationBox/reducer";
import videoPageDataReducer from "./pages/video/reducer";
import userStoriesReducer from "./pages/stories/reducer";

const reducer = combineReducers({
  setUserProfileDetailReducer,
  rootUserFriendsReducer,
  commentBoxReducer,
  notificationBoxReducer,
  videoPageDataReducer,
  userStoriesReducer,
});

export default reducer;
