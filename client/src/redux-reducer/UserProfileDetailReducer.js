const intitialState = {};

const setUserProfileDetailReducer = (state = intitialState, action) => {
  if (action.type === "userProfileDetail") {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserProfileDetailReducer;
