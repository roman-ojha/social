const initialState = {
  showStories: false,
  data: [],
};

const userStoriesReducer = (state = initialState, action) => {
  if (action.type === "setUserStories") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "showUserStories") {
    return {
      ...state,
      showStories: action.payload,
    };
  } else {
    return state;
  }
};

export default userStoriesReducer;
