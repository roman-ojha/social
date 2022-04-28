const initialState = [];

const userSuggestionReducer = (state = initialState, action) => {
  if (action.type === "userSugestion") {
    return action.payload.map((element) => {
      return {
        ...element,
        followed: false,
      };
    });
  } else if (action.type == "isFollowedSuggestedUser") {
    return state.map((user) =>
      user.userID == action.payload.userID
        ? { ...user, followed: action.payload.followed }
        : user
    );
  } else {
    return state;
  }
};

export default userSuggestionReducer;
