import {
  MessageListState,
  MessageListAction,
  MessageListActionTypes,
} from "./types";

const initialState: MessageListState[] = [];

const messageListReducer = (
  state: MessageListState[] = initialState,
  action: MessageListAction
) => {
  if (action.type === MessageListActionTypes.MESSAGE_LIST) {
    return action.payload.sort((a, b) => {
      if (new Date(a.lastMessageOn) < new Date(b.lastMessageOn)) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (
    action.type === MessageListActionTypes.APPEND_MESSAGE_ON_MESSAGE_LIST
  ) {
    let isExistOnList = false;
    let appendedMessage = state.map((element) => {
      if (element.messageToId === action.payload.id) {
        isExistOnList = true;
        return {
          ...element,
          message: [...element.message, action.payload.msgInfo],
        };
      } else {
        return element;
      }
    });
    if (isExistOnList === false) {
      // if user is sending message for the first time
      appendedMessage.unshift({
        lastMessageOn: new Date(),
        messageToId: action.payload.id,
        messageToUserId: action.payload.messageToUserId,
        receiverPicture: action.payload.receiverPicture,
        message: [
          {
            senderId: action.payload.msgInfo.senderId,
            senderUserId: action.payload.msgInfo.senderUserId,
            content: action.payload.msgInfo.content,
            date: action.payload.msgInfo.date,
          },
        ],
      });
    }
    return appendedMessage;
  } else {
    return state;
  }
};
export default messageListReducer;
