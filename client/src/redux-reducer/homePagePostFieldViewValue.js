const initialState = "min";

const homePagePostFieldViewValue = (state = initialState, action) => {
  if (action.type === "setHomePagePostFieldViewValue") {
    return action.payload;
  } else {
    return state;
  }
};
export default homePagePostFieldViewValue;
