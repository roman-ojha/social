const initialState = [];
// this store the user Post data
const setUserProfilePostReducer = (state = initialState, action) => {
  if (action.type === "userProfilePost") {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserProfilePostReducer;
