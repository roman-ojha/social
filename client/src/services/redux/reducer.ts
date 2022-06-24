import { combineReducers } from "redux";
import rootUserProfileDetailReducer from "./global/rootUserProfileDetail/reducer";
import rootUserFriendsReducer from "./global/rootUserFriends/reducer";

const reducer = combineReducers({
  rootUserProfileDetailReducer,
  rootUserFriendsReducer,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
