export const mainPageMessageViewOnOff = () => {
  return {
    type: "MainPageMessageViewOnOf",
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
