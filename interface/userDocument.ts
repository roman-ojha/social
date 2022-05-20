import { Document } from "mongoose";

export default interface UserDocument extends Document {
  googleID: number;
  id: string;
  name: string;
  email: string;
  picture: string;
  password: string;
  cpassword: string;
  userID: string;
  birthday: {
    year: string;
    month: string;
    day: string;
  };
  date: Date;
  gender: string;
  messages: [
    {
      messageToId: string;
      roomID: string;
      receiverPicture: string;
      message: [{ senderId: string; content: string; date: Date }];
    }
  ];
  followersNo: number;
  followers: [
    {
      id: string;
    }
  ];
  followingNo: number;
  following: [
    {
      id: string;
    }
  ];
  friendsNo: {
    type: number;
  };
  friends: [
    {
      id: string;
    }
  ];
  postNo: {
    type: number;
  };
  posts: [
    {
      id: string;
      caption: string;
      picture: {
        name: string;
        path: string;
        url: string;
        firebaseStorageDownloadToken: string;
        bucket: string;
      };
      likes: {
        No: number;
        by: [
          {
            userID: string;
          }
        ];
      };
      comments: {
        No: number;
        by: [
          {
            userID: string;
            comment: string;
            picture: string;
          }
        ];
      };
      date: Date;
    }
  ];
  stories: {
    caption: string;
    picture: string;
    date: string;
  };
  tokens: [
    {
      token: string;
    }
  ];
  notification: [
    {
      topic: string;
      user: string;
    }
  ];
}
