import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SchemaMethodInstance from "interface/userSchemaMethods.js";
import ModelMethodInstance from "interface/userModelMethods.js";
import { UpdateResult } from "mongodb";

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
    required: true,
  },
  userID: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  birthday: {
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
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
      lastMessageOn: {
        type: Date,
        default: Date.now,
        required: true,
      },
      messageToId: {
        // messageTo == id of User
        type: String,
        required: true,
      },
      roomID: {
        type: String,
        required: true,
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
    let token: string = jwt.sign({ id: this.id }, process.env.SECRET_KEY!);
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
    // this.posts.push(postData);
    // if (userStoryDetail !== undefined) {
    //   this.stories = userStoryDetail;
    // }
    // this.postNo++;
    // await this.save();
    console.log(postData);
    let resPost: UpdateResult;
    if (userStoryDetail !== undefined) {
      resPost = await UserDetail.updateOne(
        {
          id: this.id,
        },
        {
          $push: {
            posts: postData,
          },
          $inc: {
            postNo: 1,
          },

          $set: {
            stories: userStoryDetail,
          },
        }
      );
    } else {
      console.log("Without Stories");
      resPost = await UserDetail.updateOne(
        {
          id: this.id,
        },
        {
          $push: {
            posts: postData,
          },
          $inc: {
            postNo: 1,
          },
        }
      );
    }
    if (resPost) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
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
