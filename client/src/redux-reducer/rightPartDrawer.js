const initialState = false;

const rightPartDrawerReducer = (state = initialState, action) => {
  if (action.type === "openRightPartDrawer") {
    return action.bool;
  } else {
    return state;
  }
};

export default rightPartDrawerReducer;
