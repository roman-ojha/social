const initialState = {
  userID: "",
  post: [],
  friends: [],
  followings: [],
  followers: [],
};

const profilePageDataReducer = (state = initialState, action) => {
  if (action.type === "profilePageDataAction") {
    return action.payload;
  } else if (action.type === "setProfilePageFriends") {
    return {
      ...state,
      friends: action.payload,
    };
  } else if (action.type === "setProfilePageFollowers") {
    return {
      ...state,
      followers: action.payload,
    };
  } else if (action.type === "setProfilePageFollowings") {
    return {
      ...state,
      followings: action.payload,
    };
  } else {
    return state;
  }
};

export default profilePageDataReducer;
