const initialState = false;

const notificationBox = (state = initialState, action) => {
  if (action.type === "openNotificationBox") {
    return action.bool;
  } else {
    return state;
  }
};

export default notificationBox;
