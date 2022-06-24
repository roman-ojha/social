import { EmojiPickerAction, EmojiPickerActionTypes } from "./types";

const initialState: boolean = false;

const displayEmojiPicker = (
  state: boolean = initialState,
  action: EmojiPickerAction
) => {
  switch (action.type) {
    case EmojiPickerActionTypes.DISPLAY_USER_POST_FIELD_EMOJI_PICKER:
      return action.payload;
    default:
      return state;
  }
};

export default displayEmojiPicker;
