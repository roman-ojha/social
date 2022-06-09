const userPosts = {
  id: {
    type: String,
  },
  caption: {
    type: String,
  },
  picture: {
    name: {
      type: String,
    },
    path: {
      type: String,
    },
    url: {
      type: String,
    },
    firebaseStorageDownloadToken: {
      type: String,
    },
    bucket: {
      type: String,
    },
  },
  likes: {
    No: {
      type: Number,
    },
    by: [
      {
        user: {
          // user = id of user how like the post
          type: String,
        },
      },
    ],
  },
  comments: {
    No: {
      type: Number,
    },
    by: [
      {
        // userID: {
        //   type: String,
        // },
        user: {
          // user = id of the user who comment in post
          type: String,
        },
        comment: {
          type: String,
        },
        // picture: {
        //   type: String,
        // },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
};
export default userPosts;
