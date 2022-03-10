const initialState = [];

const userStoriesReducer = (state = initialState, action) => {
  if (action.type === "userStories") {
    return action.payload;
  } else {
    return state;
  }
};

export default userStoriesReducer;
