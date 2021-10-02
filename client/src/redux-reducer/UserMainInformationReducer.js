const intitialState = {};

const setUserMainInformationReducer = (state = intitialState, action) => {
  if (action.type === "userMainInformation") {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserMainInformationReducer;
