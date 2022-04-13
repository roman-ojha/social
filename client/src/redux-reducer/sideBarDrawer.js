const initialState = false;

const sideBarDrawerReducer = (state = initialState, action) => {
  if (action.type === "") {
    return action.payload;
  } else {
    return state;
  }
};

export default sideBarDrawerReducer;
