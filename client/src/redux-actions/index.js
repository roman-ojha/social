export const mainPageMessageViewOnOff = (data) => {
  // this action is for to store the state of message box on and off
  return {
    type: "MainPageMessageViewOnOf",
    payload: data,
  };
};

export const mainPageMessageInnerViewOnOff = (data) => {
  // this action is for to store the state of inner user message box on and off
  return {
    type: "mainPageMessageInnerViewOnOff",
    payload: data,
  };
};

export const messageListAction = (data) => {
  return {
    type: "messageList",
    payload: data,
  };
};

export const appendMessageOnMessageListAction = (data) => {
  return {
    type: "appendMessageOnMessageList",
    payload: data,
  };
};

export const userPostResponseData = (data) => {
  return {
    type: "UserPostResponseData",
    payload: data,
  };
};

export const homePageUserPostFieldDataAction = (data) => {
  return {
    type: "homePageUserPostFieldData",
    payload: data,
  };
};

export const userProfileDetailAction = (value) => {
  return {
    type: "userProfileDetail",
    payload: value,
  };
};

export const changeUserProfilePictureAction = (data) => {
  return {
    type: "changeUserProfilePicture",
    payload: data,
  };
};

export const changeRootUserUserIDAction = (data) => {
  return {
    type: "changeRootUserUserID",
    payload: data,
  };
};

export const changeRootUserNameAction = (data) => {
  return {
    type: "changeRootUserName",
    payload: data,
  };
};

export const userProfilePostAction = (value) => {
  return {
    type: "userProfilePost",
    payload: value,
  };
};

export const incrementPostCommentNumber = (data) => {
  return {
    type: "incrementPostCommentNumber",
    payload: data,
  };
};

export const profilePageDataAction = (value) => {
  return {
    type: "profilePageDataAction",
    payload: value,
  };
};

export const followedUserPostDataAction = (value) => {
  return {
    type: "followedUserPostData",
    payload: value,
  };
};

// this action will have the messge of rootUser message to other people and which is currently fetch
export const currentUserMessageAction = (message) => {
  return {
    type: "currentUserMessage",
    payload: message,
  };
};

export const appendOnMessage = (message) => {
  return {
    type: "appendOnMessage",
    payload: message,
  };
};

export const userMessageFieldAction = (message) => {
  return {
    type: "userMessageField",
    payload: message,
  };
};

export const userSuggestionAction = (data) => {
  return {
    type: "userSugestion",
    payload: data,
  };
};

export const followedByUserAction = (data) => {
  return {
    type: "followedByUser",
    payload: data,
  };
};

export const commentBoxAction = (data) => {
  return {
    type: "commentBox",
    payload: data,
  };
};

export const startProgressBar = () => {
  return {
    type: "startProgressBar",
  };
};

export const stopProgressBar = () => {
  return {
    type: "stopProgressBar",
  };
};

export const hideProgressBar = () => {
  return {
    type: "hideProgressBar",
  };
};

export const changeLikeNo = (data) => {
  return {
    type: "changeLikeNo",
    payload: data,
  };
};

export const setUserStories = (data) => {
  return {
    type: "setUserStories",
    payload: data,
  };
};

export const viewUserStories = (data) => {
  return {
    type: "viewUserStories",
    payload: data,
  };
};
