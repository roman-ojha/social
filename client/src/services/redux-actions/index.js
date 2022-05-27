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

export const userProfileDetailAction = (data) => {
  return {
    type: "userProfileDetail",
    payload: data,
  };
};

export const setRootUserPostData = (data) => {
  return {
    type: "setRootUserPostData",
    payload: data,
  };
};

export const setRootUserFriends = (data) => {
  return {
    type: "setRootUserFriends",
    payload: data,
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

export const setRootUserProfileDataState = (data) => {
  return {
    type: "setRootUserProfileDataState",
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

export const setProfilePageFriends = (data) => {
  return {
    type: "setProfilePageFriends",
    payload: data,
  };
};

export const setProfilePageFollowers = (data) => {
  return {
    type: "setProfilePageFollowers",
    payload: data,
  };
};

export const setProfilePageFollowings = (data) => {
  return {
    type: "setProfilePageFollowings",
    payload: data,
  };
};

export const setFetchedFriendsOrFollowersOrFollowing = (bool) => {
  return {
    type: "setFetchedFriendsOrFollowersOrFollowing",
    bool,
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

export const appendOnCurrentInnerUserMessage = (message) => {
  return {
    type: "appendOnCurrentInnerUserMessage",
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

export const isFollowedSuggestedUser = (data) => {
  return {
    type: "isFollowedSuggestedUser",
    payload: data,
  };
};

export const followedByUserAction = (data) => {
  return {
    type: "followedByUser",
    payload: data,
  };
};

export const isFollowedFollowedByUser = (data) => {
  return {
    type: "isFollowedFollowedByUser",
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

export const storyIndex = (data) => {
  return {
    type: "storyIndex",
    payload: data,
  };
};

export const openSideBarDrawer = (data) => {
  return {
    type: "openSideBarDrawer",
    payload: data,
  };
};

export const openRightPartDrawer = (bool) => {
  return {
    type: "openRightPartDrawer",
    bool,
  };
};

export const setHomePagePostFieldViewValue = (data) => {
  return {
    type: "setHomePagePostFieldViewValue",
    payload: data,
  };
};

export const openNotificationBox = (bool) => {
  return {
    type: "openNotificationBox",
    bool,
  };
};

export const setNotificationData = (data) => {
  return {
    type: "setNotificationData",
    payload: data,
  };
};

export const openMoreProfileBox = (bool) => {
  return {
    type: "openMoreProfileBox",
    bool,
  };
};

export const showLoadingSpinner = (bool) => {
  return {
    type: "showLoadingSpinner",
    bool,
  };
};

export const setVideoPageData = (data) => {
  return {
    type: "setVideoPageData",
    payload: data,
  };
};
