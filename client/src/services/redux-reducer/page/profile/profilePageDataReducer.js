const initialState = {
  userID: "",
  post: [],
};

const profilePageDataReducer = (state = initialState, action) => {
  if (action.type === "profilePageDataAction") {
    console.log(action.payload);
    return action.payload;
  } else {
    return state;
  }
};

export default profilePageDataReducer;
