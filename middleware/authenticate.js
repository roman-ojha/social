const jwt = require("jsonwebtoken");
const userDetail = require("../models/userDetail_model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.AuthToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await userDetail.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
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

module.exports = authenticate;
