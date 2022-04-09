const initialState = false;

const progressBarReducer = (state = initialState, action) => {
  if (action.type === "showProgressBar") {
    return action.payload;
  } else {
    return state;
  }
};

export default progressBarReducer;
