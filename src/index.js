import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "../router/route.js";
import storageRouter from "../router/storageRoute.js";
import google_OAuth_route from "../router/google_OAuth_route.js";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;

// Database connection
import("../db/userDataConnection.js");
import("../db/userStorageConnection.js");

// Connection router
app.use(router);
app.use(storageRouter);

// using google authentication function

app.use(google_OAuth_route);

// listening to a 'PORT'
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
