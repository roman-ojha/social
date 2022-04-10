const initialState = {
  showProgressBar: false,
  isCompleted: false,
};

const progressBarReducer = (state = initialState, action) => {
  if (action.type === "startProgressBar") {
    return {
      isCompleted: false,
      showProgressBar: true,
    };
  } else if (action.type === "stopProgressBar") {
    return {
      showProgressBar: true,
      isCompleted: true,
    };
  } else if (action.type === "hideProgressBar") {
    return {
      showProgressBar: false,
      isCompleted: false,
    };
  } else {
    return state;
  }
};

export default progressBarReducer;
