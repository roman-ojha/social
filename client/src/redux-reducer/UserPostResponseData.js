const initialState = {
  content: "",
  picture: {
    name: "",
    path: "",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    firebaseStorageDownloadToken: "",
    bucket: "",
  },
  like: "",
  date: "",
};

const setUserPostResponseData = (state = initialState, action) => {
  if (action.type === "UserPostResponseData") {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserPostResponseData;
