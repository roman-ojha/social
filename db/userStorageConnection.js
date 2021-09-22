import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

const DB = process.env.USERSTORAGEDATABASE;

const stgConn = mongoose.createConnection(DB);

export default stgConn;
