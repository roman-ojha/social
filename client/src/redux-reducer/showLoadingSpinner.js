const initialState = false;

const showLoadingSpinnerReducer = (state = initialState, action) => {
  if (action.type === "showLoadingSpinner") return action.bool;
  return state;
};

export default showLoadingSpinnerReducer;
