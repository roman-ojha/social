const initialState = false;

const changeMainPageMessageView = (state = initialState, action) => {
  if (action.type === "MainPageMessageViewOnOf") {
    if (state === false) {
      return true;
    } else if (state === true) {
      return false;
    }
  } else {
    return state;
  }
};

export default changeMainPageMessageView;
