const initialState = [];

const messageListReducer = (state = initialState, action) => {
  if (action.type === "messageList") {
    return action.payload.sort((a, b) => {
      if (new Date(a.lastMessageOn) < new Date(b.lastMessageOn)) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (action.type === "appendMessageOnMessageList") {
    return state.map((element) =>
      element.messageToId === action.payload.id
        ? {
            ...element,
            message: [...element.message, action.payload.msgInfo],
          }
        : element
    );
  } else {
    return state;
  }
};
export default messageListReducer;
