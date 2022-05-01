import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "./userSchema.js";

const userDetailSchema = new mongoose.Schema(userSchema);

userDetailSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userDetailSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

userDetailSchema.methods.uploadPost = async function (
  postData,
  userStoryDetail
) {
  try {
    // console.log(postData);
    this.posts.unshift(postData);
    if (userStoryDetail != undefined) {
      this.stories = userStoryDetail;
    }
    this.postNo++;
    await this.save();
    return this.posts;
  } catch (err) {
    console.log(err);
  }
};

userDetailSchema.methods.followUser = async function (followedToUser) {
  try {
    // saving following user detail into current user database
    this.following.unshift(followedToUser);
    this.followingNo++;
    // saving following user detail into followed to user database
    const res = await UserDetail.updateOne(
      {
        userID: followedToUser.userID,
      },
      {
        // pushing the new followers into followed to user database
        $push: {
          followers: {
            name: this.name,
            email: this.email,
            userID: this.userID,
            picture: this.picture,
          },
        },
        $inc: {
          followersNo: 1,
        },
      }
    );
    if (res) {
      await this.save();
      return true;
    } else {
      return false;
    }
  } catch (err) {}
};

userDetailSchema.methods.saveMessage = async function (message) {
  try {
    console.log(message);
    // searching for a use which is getting the message
  } catch (err) {}
};

const UserDetail = mongoose.model("USERDETAIL", userDetailSchema);
export default UserDetail;
