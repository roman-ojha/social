import userDetail from "../models/userDetail_model.js";
import jwt from "jsonwebtoken";
import ExtendJWTPayload from "types/jsonwebtoken/extend-jwt-payload.js";

export default async function varifyUser(token: string) {
  const verifyToken = jwt.verify(
    token,
    process.env.SECRET_KEY!
  ) as ExtendJWTPayload;
  const rootUser = await userDetail.findOne(
    {
      id: verifyToken.id,
      "tokens.token": token,
    },
    {
      name: 1,
      userID: 1,
      email: 1,
      posts: 1,
      stories: 1,
      postNo: 1,
    }
  );
  if (!rootUser) {
    // return rootUser;
    return null;
  }
  return rootUser;
}
