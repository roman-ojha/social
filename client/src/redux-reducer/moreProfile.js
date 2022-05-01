const initialState = false;

const moreProfileBoxReducer = (state = initialState, action) => {
  if (action.type === "openMoreProfileBox") {
    return action.bool;
  } else {
    return state;
  }
};

export default moreProfileBoxReducer;
