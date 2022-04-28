const initialState = [];

const followedByUserReducer = (state = initialState, action) => {
  if (action.type === "followedByUser") {
    return action.payload.map((element) => {
      return {
        ...element,
        followed: false,
      };
    });
  } else if (action.type == "isFollowedFollowedByUser") {
    return state.map((user) =>
      user.userID == action.payload.userID
        ? { ...user, followed: action.payload.followed }
        : user
    );
  } else {
    return state;
  }
};

export default followedByUserReducer;
