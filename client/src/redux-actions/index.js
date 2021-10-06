export const mainPageMessageViewOnOff = () => {
  // this action is for to store the state of message box on and off
  return {
    type: "MainPageMessageViewOnOf",
  };
};

export const mainPageMessageInnerViewOnOff = () => {
  // this action is for to store the state of inner user message box on and off
  return {
    type: "mainPageMessageInnerViewOnOff",
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

export const userProfilePostAction = (value) => {
  return {
    type: "userProfilePost",
    payload: value,
  };
};

export const searchedUserProfileAction = (value) => {
  return {
    type: "searchedUserProfile",
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

export const userMessageFieldAction = (message) => {
  return {
    type: "userMessageField",
    payload: message,
  };
};
