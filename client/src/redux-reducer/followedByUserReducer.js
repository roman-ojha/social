const initialState = [];

const followedByUserReducer = (state = initialState, action) => {
  if (action.type === "followedByUser") {
    return action.payload;
  } else {
    return state;
  }
};

export default followedByUserReducer;
