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
