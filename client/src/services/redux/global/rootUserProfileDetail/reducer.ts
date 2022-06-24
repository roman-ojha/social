import {
  RootUserProfileDetailState,
  RootUserProfileDetailActionTypes,
  RootUserProfileDetailAction,
} from "./types";
const initialState: RootUserProfileDetailState = {
  fetchedPostData: false,
  birthday: {
    day: "",
    month: "",
    year: "",
  },
  cpassword: "",
  password: "",
  date: new Date(),
  email: "",
  followers: [
    {
      id: "",
    },
  ],
  followersNo: 0,
  following: [
    {
      id: "",
    },
  ],
  followingNo: 0,
  friends: [
    {
      id: "",
    },
  ],
  friendsNo: 0,
  gender: "",
  googleID: 0,
  id: "",
  messages: [
    {
      lastMessageOn: new Date(),
      message: [
        {
          content: "",
          date: new Date(),
          senderId: "",
        },
      ],
      messageToId: "",
      roomID: "",
    },
  ],
  name: "",
  notification: [
    {
      topic: "",
      user: "",
    },
  ],
  picture: "",
  postNo: 0,
  posts: [
    {
      caption: "",
      comments: {
        by: [
          {
            comment: "",
            user: "",
          },
        ],
        No: 0,
      },
      date: new Date(),
      id: "",
      likes: {
        by: [
          {
            user: "",
          },
        ],
        No: 0,
      },
      picture: {
        bucket: "",
        firebaseStorageDownloadToken: "",
        name: "",
        path: "",
        url: "",
      },
    },
  ],
  stories: {
    caption: "",
    date: "",
    picture: "",
  },
  tokens: [
    {
      token: "",
    },
  ],
  userID: "",
};
// this store the detail of Root User

const rootUserProfileDetailReducer = (
  state: RootUserProfileDetailState = initialState,
  action: RootUserProfileDetailAction
) => {
  switch (action.type) {
    case RootUserProfileDetailActionTypes.SET_ROOT_USER_PROFILE_DETAIL:
      return {
        ...state,
        ...action.payload,
      };
    case RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_PROFILE_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case RootUserProfileDetailActionTypes.CHANGE_ROOT_USER_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };
    case RootUserProfileDetailActionTypes.CHANGE_ROOT_USERNAME:
      return {
        ...state,
        name: action.payload,
      };
    case RootUserProfileDetailActionTypes.SET_ROOT_USER_POST_DATA:
      return {
        ...state,
        fetchedPostData: action.payload.fetchedPostData,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
};

export default rootUserProfileDetailReducer;
