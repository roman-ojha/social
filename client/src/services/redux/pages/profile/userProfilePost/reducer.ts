import {
  UserProfilePostAction,
  UserProfilePostActionTypes,
  UserProfilePostState,
} from "./types";

const initialState: UserProfilePostState[] = [];
// this store the user Post data
const setUserProfilePostReducer = (
  state: UserProfilePostState[] = initialState,
  action: UserProfilePostAction
) => {
  switch (action.type) {
    case UserProfilePostActionTypes.SET_USER_PROFILE_POST:
      return action.payload;
    default:
      return state;
  }
};

export default setUserProfilePostReducer;
