const initialState = [];

const messageListReducer = (state = initialState, action) => {
  if (action.type === "messageList") {
    console.log(action.payload);
    return action.payload;
  } else {
    return state;
  }
};
export default messageListReducer;
