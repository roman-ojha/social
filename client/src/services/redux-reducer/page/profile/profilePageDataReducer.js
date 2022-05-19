const initialState = {
  userID: "",
  post: [],
  fetchedFriendsOrFollowersOrFollowing: false,
};

const profilePageDataReducer = (state = initialState, action) => {
  if (action.type === "profilePageDataAction") {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === "setProfilePageFriends") {
    return {
      ...state,
      fetchedFriendsOrFollowersOrFollowing:
        action.payload.fetchedFriendsOrFollowersOrFollowing,
      friends: action.payload.friends,
    };
  } else {
    return state;
  }
};

export default profilePageDataReducer;
