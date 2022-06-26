import {
  UserMessageFieldState,
  UserMessageFieldAction,
  UserMessageFieldActionTypes,
} from "./types";

const initialMessage: UserMessageFieldState = "";

const setUserMessageFieldReducer = (
  state: UserMessageFieldState = initialMessage,
  action: UserMessageFieldAction
) => {
  if (action.type === UserMessageFieldActionTypes.USER_MESSAGE_FIELD) {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserMessageFieldReducer;
