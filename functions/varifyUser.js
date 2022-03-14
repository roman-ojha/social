import userDetail from "../models/userDetail_model.js";
import jwt from "jsonwebtoken";

export default async function varifyUser(token) {
  const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
  return await userDetail.findOne({
    _id: verifyToken._id,
    "tokens.token": token,
  });
}
