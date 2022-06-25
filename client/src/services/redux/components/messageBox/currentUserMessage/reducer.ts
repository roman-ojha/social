import {
  CurrentUserMessageAction,
  CurrentUserMessageActionTypes,
  CurrentUserMessageState,
} from "./types";

const initialMessage: CurrentUserMessageState = {
  messageToId: "",
  messageToUserId: "",
  receiverPicture: "",
  message: [],
  fetchedInnerMessage: false,
};

// this action will Store the messge of rootUser message to other people and which is currently fetch
const setCurrentUserMessageReducer = (
  state: CurrentUserMessageState = initialMessage,
  action: CurrentUserMessageAction
) => {
  if (action.type === CurrentUserMessageActionTypes.CURRENT_USER_MESSAGE) {
    return {
      ...action.payload,
      message: action.payload.message.reverse(),
    };
  } else if (
    action.type ===
    CurrentUserMessageActionTypes.APPEND_ON_CURRENT_INNER_USER_MESSAGE
  ) {
    return {
      ...state,
      message: [action.payload, ...state.message],
    };
  } else {
    return state;
  }
};

export default setCurrentUserMessageReducer;
