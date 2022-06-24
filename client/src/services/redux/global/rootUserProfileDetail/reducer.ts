import {
  RootUserProfileDetailState,
  RootUserProfileDetailActionTypes,
  RootUserProfileDetailAction,
} from "./types";
const initialState: RootUserProfileDetailState = {
  fetchedPostData: false,
};
// this store the detail of Root User

const rootUserProfileDetailReducer = (
  state: RootUserProfileDetailState = initialState,
  action: RootUserProfileDetailAction
) => {
  switch (action.type) {
    case RootUserProfileDetailActionTypes.SET_ROOT_USER_PROFILE_DETAIL:
      return {
        ...state,
        ...action.payload,
      };
    case RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_PROFILE_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };
    case RootUserProfileDetailActionTypes.CHANGE_ROOT_USERNAME:
      return {
        ...state,
        name: action.payload,
      };
    case RootUserProfileDetailActionTypes.SET_ROOT_USER_POST_DATA:
      return {
        ...state,
        fetchedPostData: action.payload.fetchedPostData,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
};

export default rootUserProfileDetailReducer;
