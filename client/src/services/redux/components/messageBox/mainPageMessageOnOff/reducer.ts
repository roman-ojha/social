const initialState = false;

const changeMainPageMessageView = (state = initialState, action) => {
  if (action.type === "MainPageMessageViewOnOf") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeMainPageMessageView;
