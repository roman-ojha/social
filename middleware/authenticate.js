import jwt from "jsonwebtoken";
import userDetail from "../models/userDetail_model.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await userDetail.findOne(
      {
        _id: verifyToken._id,
        "tokens.token": token,
      },
      // filtering to get only data that is need when page load
      {
        // name: 1,
        // email: 1,
        // birthday: 1,
        // gender: 1,
        // picture: 1,
        // userID: 1,
        posts: { $slice: [0, 5] },
        // posts: { caption: 1, date: 1, picture: { url: 1 } },
        password: 0,
        cpassword: 0,
      }
    );
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(err);
  }
};

export default authenticate;
