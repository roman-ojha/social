import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SchemaMethodInstance from "interface/userSchemaMethods.js";
import ModelMethodInstance from "interface/userModelMethods.js";
import userMessages from "./userMessages.js";
import userPosts from "./userPosts.js";
import userStories from "./userStories.js";
import userNotifications from "./userNotifications.js";
import userTokens from "./userTokens.js";
import userBirthday from "./userBirthday.js";

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
  },
  cpassword: {
    type: String,
  },
  birthday: userBirthday,
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    require: true,
  },
  messages: [userMessages],
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
  posts: [userPosts],
  stories: userStories,
  notification: [userNotifications],
  tokens: [userTokens],
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

// userDetailSchema.methods.uploadPost = async function (
//   postData: UserDocumentPosts,
//   userStoryDetail: UserDocumentStories
// ) {
//   try {
//     let resPost: UpdateResult;
//     if (userStoryDetail !== undefined) {
//       resPost = await UserDetail.updateOne(
//         {
//           id: this.id,
//         },
//         {
//           $push: {
//             // posts: postData,
//             posts: { $each: [postData], $position: 0 },
//           },
//           $inc: {
//             postNo: 1,
//           },

//           $set: {
//             stories: userStoryDetail,
//           },
//         }
//       );
//     } else {
//       resPost = await UserDetail.updateOne(
//         {
//           id: this.id,
//         },
//         {
//           $push: {
//             posts: postData,
//           },
//           $inc: {
//             postNo: 1,
//           },
//         }
//       );
//     }
//     if (resPost) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

// userDetailSchema.methods.followUser = async function (followedToUser: any) {
//   try {
//     // saving following user detail into current user database
//     const addOnRootUser = await UserDetail.updateOne(
//       {
//         id: this.id,
//       },
//       {
//         // pushing the new followers into followed to user database
//         $push: {
//           following: {
//             id: followedToUser.id,
//           },
//         },
//         $inc: {
//           followingNo: 1,
//         },
//       }
//     );

//     // saving following user detail into followed to user database
//     const followRes = await UserDetail.updateOne(
//       {
//         id: followedToUser.id,
//       },
//       {
//         // pushing the new followers into followed to user database
//         $push: {
//           followers: {
//             id: this.id,
//           },
//           notification: {
//             topic: "follow",
//             user: this.id,
//           },
//         },
//         $inc: {
//           followersNo: 1,
//         },
//       }
//     );
//     if (followRes && addOnRootUser) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

const UserDetail = mongoose.model<SchemaMethodInstance>(
  "USERDETAIL",
  userDetailSchema
);

export default UserDetail;
