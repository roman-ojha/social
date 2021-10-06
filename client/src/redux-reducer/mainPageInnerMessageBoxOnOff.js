const initialState = false;

const mainPageInnerMessageBoxOnOff = (state = initialState, action) => {
  if (action.type === "mainPageMessageInnerViewOnOff") {
    if (state === false) {
      return true;
    } else if (state === true) {
      return false;
    }
  } else {
    return state;
  }
};

export default mainPageInnerMessageBoxOnOff;
