const initialState = [];

const userSuggestionReducer = (state = initialState, action) => {
  if (action.type === "userSugestion") {
    return action.payload;
  } else {
    return state;
  }
};

export default userSuggestionReducer;
