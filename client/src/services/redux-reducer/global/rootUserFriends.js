const initialState = [];

const rootUserFriends = (state = initialState, action) => {
  if (action.type === "setRootUserFriends") {
    return action.payload;
  } else {
    return state;
  }
};

export default rootUserFriends;
