const initialState = {
  fetchedRootUserProfileData: false,
  getRootUserProfileData: false,
};

const rootUserProfileDataState = (state = initialState, action) => {
  switch (action.type) {
    case "setRootUserProfileDataState":
      return action.payload;
    default:
      return state;
  }
};

export default rootUserProfileDataState;
