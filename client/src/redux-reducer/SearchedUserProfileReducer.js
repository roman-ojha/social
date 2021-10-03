const initialState = {
  userID: "",
};

const setSearchUserProfileReducer = (state = initialState, action) => {
  if (action.type === "searchedUserProfile") {
    return action.payload;
  } else {
    return state;
  }
};

export default setSearchUserProfileReducer;
