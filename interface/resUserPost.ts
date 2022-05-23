type ResPonseUserPost = {
  id: string;
  caption: string;
  picture: {
    url: string;
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
    by: [
      {
        user: string;
        comment: string;
        picture: string;
        userID: string;
      }
    ];
  };
  date: Date;
};

export default ResPonseUserPost;
