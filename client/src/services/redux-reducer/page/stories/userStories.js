const initialState = {
  storyIndex: 0,
  data: [],
};

const userStoriesReducer = (state = initialState, action) => {
  if (action.type === "setUserStories") {
    return {
      ...state,
      data: action.payload.sort((a, b) => {
        if (a.type !== "bot" || b.type != "bot") {
          return;
        } else {
          return Math.random() - 0.5;
        }
      }),
    };
  } else if (action.type === "storyIndex") {
    return {
      ...state,
      storyIndex: action.payload,
    };
  } else {
    return state;
  }
};

export default userStoriesReducer;
