const initialState = [];

const userSuggestionReducer = (state = initialState, action) => {
  if (action.type === "userSugestion") {
    const newList = action.payload.map((element) => {
      return {
        ...element,
        followed: false,
      };
    });
    return newList.sort((a, b) => {
      if (a.type !== "bot" || b.type !== "bot") {
        return;
      } else {
        return Math.random() - 0.5;
      }
    });
  } else if (action.type === "isFollowedSuggestedUser") {
    return state.map((user) =>
      user.userID === action.payload.userID
        ? { ...user, followed: action.payload.followed }
        : user
    );
  } else {
    return state;
  }
};

export default userSuggestionReducer;
