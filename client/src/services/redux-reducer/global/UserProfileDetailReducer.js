const initialState = {
  fetchedPostData: false,
};
// this store the detail of user

const setUserProfileDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "userProfileDetail":
      return {
        ...state,
        ...action.payload,
      };
    case "changeUserProfilePicture":
      return {
        ...state,
        picture: action.payload,
      };
    case "changeRootUserUserID":
      return {
        ...state,
        userID: action.payload,
      };
    case "changeRootUserName":
      return {
        ...state,
        name: action.payload,
      };
    case "setRootUserPostData":
      return {
        ...state,
        fetchedPostData: action.payload.fetchedPostData,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
};

export default setUserProfileDetailReducer;
