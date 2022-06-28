export interface UserPostCommentsType {
  picture: string;
  userID: string;
  comment: string;
}

export default interface UserPostType {
  picture: { url: string };
  caption: string;
  comments: {
    No: number;
    by: UserPostCommentsType[];
  };
  date: Date;
  id: string;
  likes: {
    No: number;
    by: { user: string }[];
  };
}
