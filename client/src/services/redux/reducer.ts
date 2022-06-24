import { combineReducers } from "redux";
import rootUserProfileDetailReducer from "./global/rootUserProfileDetail/reducer";
import rootUserFriendsReducer from "./global/rootUserFriends/reducer";
import commentBoxReducer from "./components/commentBox/reducer";

const reducer = combineReducers({
  rootUserProfileDetailReducer,
  rootUserFriendsReducer,
  commentBoxReducer,
});

export default reducer;
