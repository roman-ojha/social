export enum EmojiPickerActionTypes {
  DISPLAY_USER_POST_FIELD_EMOJI_PICKER = "displayUserPostFieldEmojiPicker",
}

export interface DisplayUserPostFieldEmojiPickerAction {
  type: EmojiPickerActionTypes.DISPLAY_USER_POST_FIELD_EMOJI_PICKER;
  payload: boolean;
}

export type EmojiPickerAction = DisplayUserPostFieldEmojiPickerAction;
