const initialState = false;

const sideBarDrawerReducer = (state = initialState, action) => {
  if (action.type === "openSideBarDrawer") {
    return action.payload;
  } else {
    return state;
  }
};

export default sideBarDrawerReducer;
