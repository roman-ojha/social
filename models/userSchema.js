export default {
  googleID: {
    type: Number,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
  birthday: {
    year: {
      type: String,
      require: true,
    },
    month: {
      type: String,
      require: true,
    },
    day: {
      type: String,
      require: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    require: true,
  },
  messages: [
    {
      messageTo: {
        type: String,
      },
      roomID: {
        type: String,
        require: true,
      },
      receiverPicture: {
        type: String,
      },
      message: [
        {
          sender: {
            type: String,
          },
          content: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  followersNo: {
    type: Number,
  },
  followers: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      userID: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  followingNo: {
    type: Number,
  },
  following: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      userID: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  friendsNo: {
    type: Number,
  },
  friends: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      userID: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  postNo: {
    type: Number,
  },
  posts: [
    {
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
            userID: {
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
            userID: {
              type: String,
            },
            comment: {
              type: String,
            },
            picture: {
              type: String,
            },
          },
        ],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  storiesNo: {
    type: Number,
  },
  stories: [
    {
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
            userID: {
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
            userID: {
              type: String,
            },
            comment: {
              type: String,
            },
          },
        ],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
};
