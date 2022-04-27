import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "../routes/post.js";
import userRoute from "../routes/user.js";
import userAuthRoute from "../routes/userAuth.js";
import messageRoute from "../routes/message.js";
import settingRoute from "../routes/setting.js";
import storageRouter from "../routes/storageRoute.js";
import google_OAuth_route from "../routes/google_OAuth_route.js";
import cors from "cors";
import bodyParser from "body-parser";
import { httpServer, app } from "../socket/io.js";
const PORT = process.env.PORT;
// app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cookieParser());
app.unsubscribe(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
import("../db/userDataConnection.js");
import("../db/userStorageConnection.js");

// Connection router
app.use(userRoute);
app.use(userAuthRoute);
app.use(messageRoute);
app.use(settingRoute);
app.use(postRoute);
app.use(storageRouter);
import "../socket/io.js";

// using google authentication function

app.use(google_OAuth_route);

// listening to a 'PORT'
httpServer.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
