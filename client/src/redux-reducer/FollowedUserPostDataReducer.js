const initialState = [];

const setFollowedUserPostDataReducer = (state = initialState, action) => {
  if (action.type === "followedUserPostData") {
    return action.payload;
  } else {
    return state;
  }
};

export default setFollowedUserPostDataReducer;
