import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userDetailSchema = new mongoose.Schema({
  googleID: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
  },
  socailID: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
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
  posts: [
    {
      content: {
        type: String,
      },
      picture: {
        type: String,
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
});

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

userDetailSchema.methods.uploadPost = async function (postData) {
  try {
    // console.log(postData);
    this.posts.unshift(postData);
    await this.save();
    return this.posts;
  } catch (err) {
    console.log(err);
  }
};

const UserDetail = mongoose.model("USERDETAIL", userDetailSchema);
export default UserDetail;
