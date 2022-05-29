const initialState = {
  fetchedFriends: false,
  friends: [],
};

const rootUserFriends = (state = initialState, action) => {
  if (action.type === "setRootUserFriends") {
    return {
      fetchedFriends: action.payload.fetchedFriends,
      friends: action.payload.friends.sort((a, b) => Math.random() - 0.5),
    };
  } else {
    return state;
  }
};

export default rootUserFriends;
