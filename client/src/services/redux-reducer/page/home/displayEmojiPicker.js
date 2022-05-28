const initialState = false;

const displayEmojiPicker = (state = initialState, action) => {
  if (action.type === "displayUserPostFieldEmojiPicker") {
    return action.bool;
  } else {
    return state;
  }
};

export default displayEmojiPicker;
