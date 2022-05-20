import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SchemaMethodInstance from "interface/userSchemaMethods.js";
import ModelMethodInstance from "interface/userModelMethods.js";

const userDetailSchema = new mongoose.Schema<
  SchemaMethodInstance,
  ModelMethodInstance,
  {},
  {}
>({
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
      messageToId: {
        // messageTo == id of User
        type: String,
      },
      roomID: {
        type: String,
        require: true,
      },
      message: [
        {
          senderId: {
            // Sender == id of User
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
      id: {
        type: String,
      },
    },
  ],
  followingNo: {
    type: Number,
  },
  following: [
    {
      id: {
        type: String,
      },
    },
  ],
  friendsNo: {
    type: Number,
  },
  friends: [
    {
      id: {
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
  stories: {
    caption: {
      type: String,
    },
    picture: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  notification: [
    {
      topic: {
        type: String,
      },
      user: {
        // user is the id of user
        type: String,
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
});

userDetailSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userDetailSchema.methods.generateAuthToken = async function (): Promise<
  string | null
> {
  try {
    let token: string = jwt.sign({ _id: this._id }, process.env.SECRET_KEY!);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    return null;
  }
};

userDetailSchema.methods.uploadPost = async function (
  postData: object,
  userStoryDetail: object
) {
  try {
    this.posts.unshift(postData);
    if (userStoryDetail !== undefined) {
      this.stories = userStoryDetail;
    }
    this.postNo++;
    await this.save();
    return this.posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};
userDetailSchema.methods.followUser = async function (followedToUser: any) {
  try {
    // saving following user detail into current user database
    const addOnRootUser = await UserDetail.updateOne(
      {
        id: this.id,
      },
      {
        // pushing the new followers into followed to user database
        $push: {
          following: {
            id: followedToUser.id,
          },
        },
        $inc: {
          followingNo: 1,
        },
      }
    );

    // saving following user detail into followed to user database
    const followRes = await UserDetail.updateOne(
      {
        id: followedToUser.id,
      },
      {
        // pushing the new followers into followed to user database
        $push: {
          followers: {
            id: this.id,
          },
          notification: {
            topic: "follow",
            user: this.id,
          },
        },
        $inc: {
          followersNo: 1,
        },
      }
    );
    if (followRes && addOnRootUser) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // console.log(err);
    return false;
  }
};

userDetailSchema.methods.saveMessage = async function (message) {
  try {
    console.log(message);
    // searching for a use which is getting the message
  } catch (err) {}
};

const UserDetail = mongoose.model<SchemaMethodInstance>(
  "USERDETAIL",
  userDetailSchema
);

export default UserDetail;
