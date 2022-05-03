import userDetail from "../models/userDetail_model.js";
import jwt from "jsonwebtoken";
import ExtendJWTPayload from "types/jsonwebtoken/extend-jwt-payload.js";
import User from "interface/userDocument.js";

export default async function varifyUser(token: string) {
  const verifyToken = jwt.verify(
    token,
    process.env.SECRET_KEY!
  ) as ExtendJWTPayload;
  const rootUser = await userDetail.findOne(
    {
      _id: verifyToken._id,
      "tokens.token": token,
    },
    {
      name: 1,
      userID: 1,
      email: 1,
      tokens: { $slice: [0, 5] },
    }
  );
  if (!rootUser) {
    // return rootUser;
    return undefined;
  }
  return rootUser;
}
