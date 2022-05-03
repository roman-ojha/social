import { Model } from "mongoose";
import UserDocument from "./userDocument";

export default interface ModelMethodInstance extends Model<UserDocument, {}> {}
