/* eslint-disable no-console */
import mongoose from "mongoose";

const DB = process.env.USERDATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });
