import {
  ProfilePageAction,
  ProfilePageDataActionTypes,
  ProfilePageDataState,
} from "./types";

const initialState: ProfilePageDataState = {
  userID: "",
  post: [],
  friends: [],
  followings: [],
  followers: [],
};

const profilePageDataReducer = (
  state: ProfilePageDataState = initialState,
  action: ProfilePageAction
) => {
  switch (action.type) {
    case ProfilePageDataActionTypes.PROFILE_PAGE_DATA_ACTION:
      return action.payload;
    case ProfilePageDataActionTypes.SET_PROFILE_PAGE_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case ProfilePageDataActionTypes.SET_PROFILE_PAGE_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case ProfilePageDataActionTypes.SET_PROFILE_PAGE_FOLLOWINGS:
      return {
        ...state,
        followings: action.payload,
      };
    default:
      return state;
  }
};

export default profilePageDataReducer;
