import { combineReducers } from "redux";
import rootUserProfileDetailReducer from "./global/rootUserProfileDetail/reducer";
import rootUserFriendsReducer from "./global/rootUserFriends/reducer";
import commentBoxReducer from "./components/commentBox/reducer";
import notificationBoxReducer from "./components/notificationBox/reducer";

const reducer = combineReducers({
  rootUserProfileDetailReducer,
  rootUserFriendsReducer,
  commentBoxReducer,
  notificationBoxReducer,
});

export default reducer;
