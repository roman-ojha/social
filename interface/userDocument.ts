import { Document } from "mongoose";

export type UserDocumentMessages = {
  messageToId: string;
  roomID: string;
  receiverPicture: string;
  message: [{ senderId: string; content: string; date: Date }];
};

export type UserDocumentPostsComments = {
  user: string;
  comment: string;
};

export type UserDocumentPosts = {
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
        user: string;
      }
    ];
  };
  comments: {
    No: number;
    by: [UserDocumentPostsComments];
  };
  date: Date;
};

export type UserDocumentBirthday = {
  year: string;
  month: string;
  day: string;
};

export default interface UserDocument extends Document {
  googleID: number;
  id: string;
  name: string;
  email: string;
  picture: string;
  password: string;
  cpassword: string;
  userID: string;
  birthday: UserDocumentBirthday;
  date: Date;
  gender: string;
  messages: [UserDocumentMessages];
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
  friendsNo: number;
  friends: [
    {
      id: string;
    }
  ];
  postNo: number;
  posts: [UserDocumentPosts];
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
