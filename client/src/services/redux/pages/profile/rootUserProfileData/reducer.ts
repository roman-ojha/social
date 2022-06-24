import {
  RootUserProfileDataAction,
  RootUserProfileDataActionTypes,
  RootUserProfileDataState,
} from "./types";

const initialState: RootUserProfileDataState = {
  fetchedRootUserProfileData: false,
  getRootUserProfileData: false,
};

const rootUserProfileDataState = (
  state: RootUserProfileDataState = initialState,
  action: RootUserProfileDataAction
) => {
  switch (action.type) {
    case RootUserProfileDataActionTypes.SET_ROOT_USER_PROFILE_DATA_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default rootUserProfileDataState;
