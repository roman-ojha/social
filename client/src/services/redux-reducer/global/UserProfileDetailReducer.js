const intitialState = {};
// this store the detail of user

const setUserProfileDetailReducer = (state = intitialState, action) => {
  switch (action.type) {
    case "userProfileDetail":
      return action.payload;
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
    default:
      return state;
  }
};

export default setUserProfileDetailReducer;
