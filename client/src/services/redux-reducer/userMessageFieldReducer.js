const initialMessage = "";

const setUserMessageFieldReducer = (state = initialMessage, action) => {
  if (action.type === "userMessageField") {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserMessageFieldReducer;
