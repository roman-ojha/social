const initialState = {
  notificationData: [],
  open: false,
};

const notificationBox = (state = initialState, action) => {
  if (action.type === "openNotificationBox") {
    return {
      ...state,
      open: action.bool,
    };
  } else if (action.type === "setNotificationData") {
    return {
      ...state,
      notificationData: action.payload,
    };
  } else {
    return state;
  }
};

export default notificationBox;
