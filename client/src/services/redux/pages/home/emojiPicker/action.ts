import { EmojiPickerAction, EmojiPickerActionTypes } from "./types";
import { Dispatch } from "redux";

export const displayUserPostFieldEmojiPicker = (data: boolean) => {
  return (dispatch: Dispatch<EmojiPickerAction>) => {
    dispatch({
      type: EmojiPickerActionTypes.DISPLAY_USER_POST_FIELD_EMOJI_PICKER,
      payload: data,
    });
  };
};
