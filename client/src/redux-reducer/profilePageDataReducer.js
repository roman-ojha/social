const initialState = {
  userID: "",
};

const profilePageDataReducer = (state = initialState, action) => {
  if (action.type === "profilePageDataAction") {
    return action.payload;
  } else {
    return state;
  }
};

export default profilePageDataReducer;
