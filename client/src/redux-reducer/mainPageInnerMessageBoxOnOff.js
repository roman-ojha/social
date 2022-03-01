const initialState = false;

const mainPageInnerMessageBoxOnOff = (state = initialState, action) => {
  if (action.type === "mainPageMessageInnerViewOnOff") {
    return action.payload;
  } else {
    return state;
  }
};

export default mainPageInnerMessageBoxOnOff;
