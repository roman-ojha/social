const initialState = [];

const messageListReducer = (state = initialState, action) => {
  if (action.type === "messageList") {
    return action.payload;
  } else if (action.type === "appendMessageOnMessageList") {
    return state.map((element) =>
      element.messageToId === action.payload.receiverId
        ? {
            ...element,
            message: [...element.message, action.payload],
          }
        : element
    );
  } else {
    return state;
  }
};
export default messageListReducer;
