import { Document } from "mongoose";

export type UserDocumentMessages = {
  lastMessageOn: Date;
  messageToId: string;
  roomID: string;
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

export interface RootUserNewPosts {
  id: string;
  caption: string;
  picture:
    | {
        name: string;
        path: string;
        url: string;
        firebaseStorageDownloadToken: string;
        bucket: string;
      }
    | undefined;
  likes: {
    No: number;
    by: [];
  };
  comments: {
    No: number;
    by: [];
  };
}

export type UserDocumentBirthday = {
  year: string;
  month: string;
  day: string;
};

export type UserDocumentNotification = {
  topic: string;
  user: string;
};

export type UserDocumentFollowing = {
  id: string;
};

export type UserDocumentFollower = {
  id: string;
};

export type UserDocumentFriends = {
  id: string;
};

export type UserDocumentStories = {
  caption: string;
  picture: string;
  date: string;
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
  followers: [UserDocumentFollower];
  followingNo: number;
  following: [UserDocumentFollowing];
  friendsNo: number;
  friends: [UserDocumentFriends];
  postNo: number;
  posts: [UserDocumentPosts];
  stories: UserDocumentStories;
  tokens: [
    {
      token: string;
    }
  ];
  notification: [UserDocumentNotification];
}
