export default interface UserPostType {
  picture: { url: string };
  caption: string;
  comments: {
    No: number;
    by: {}[];
  };
  date: Date;
  id: string;
  likes: {
    No: number;
    by: { user: string }[];
  };
}
