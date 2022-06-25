export interface MessageListState {
  lastMessageOn: Date;
  messageToId: string;
  messageToUserId: string;
  receiverPicture: string;
  message: {
    senderId: string;
    senderUserId: string;
    content: string;
    date: Date;
  }[];
}
export interface ResponseMessage {
  id: string;
  messageToUserId: string;
  receiverPicture: string;
  msgInfo: {
    senderId: string;
    senderUserId: string;
    content: string;
    date: Date;
  };
}

export enum MessageListActionTypes {
  MESSAGE_LIST = "messageList",
  APPEND_MESSAGE_ON_MESSAGE_LIST = "appendMessageOnMessageList",
}
export interface MessageList {
  type: MessageListActionTypes.MESSAGE_LIST;
  payload: MessageListState[];
}

export interface AppendMessageOnMessageList {
  type: MessageListActionTypes.APPEND_MESSAGE_ON_MESSAGE_LIST;
  payload: ResponseMessage;
}

export type MessageListAction = MessageList | AppendMessageOnMessageList;
