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
