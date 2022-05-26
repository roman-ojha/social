import { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import indexRouter from "../routes/index.js";
import postRoute from "../routes/post.js";
import userRoute from "../routes/user.js";
import userAuthRoute from "../routes/userAuth.js";
import messageRoute from "../routes/message.js";
import settingRoute from "../routes/setting.js";
import storageRouter from "../routes/storageRoute.js";
import google_OAuth_route from "../routes/google_OAuth_route.js";
import youtubeRoute from "../routes/youtube.js";
// import scrapRoute from "../routes/scrap.js";
import cors from "cors";
import bodyParser from "body-parser";
import { httpServer, app } from "../socket/io.js";
import AuthAdmin from "../funcs/AuthAdmin.js";
const PORT = process.env.PORT;

// warning: connect.session() MemoryStorage is not designed for a production environment as it will leak memory, and will not scale past a single process.
// NOTE: because of 'warning' i have written this bellow code but this peace of code also did not solve the issue
// import connectMongo from "connect-mongo";
// const MongoStore = new connectMongo(session);
// import session from "express-session";
// import connectMemoryStore from "memorystore";
// const MemoryStore = connectMemoryStore(session);
// app.set("truest proxy", 1);
// app.use(
//   session({
//     cookie: {
//       secure: true,
//       maxAge: 25892000000,
//     },
//     secret: process.env.SECRET_KEY as string,
//     resave: false,
//     saveUninitialized: true,
//     store: new MemoryStore({
//       checkPeriod: 86400000,
//     }),
//   })
// );
// ================================

// app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cookieParser());
// app.unsubscribe(express.json());

app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(bodyParser.json() as RequestHandler);

// Database connection
import("../db/userDataConnection.js");
import("../db/userStorageConnection.js");

// Connection router
app.use(indexRouter);
app.use(userRoute);
app.use(userAuthRoute);
app.use(messageRoute);
app.use(settingRoute);
app.use(postRoute);
app.use(storageRouter);
app.use(youtubeRoute);
// app.use(scrapRoute);
import "../socket/io.js";

// Google Oauth
app.use(google_OAuth_route);

// listening to a 'PORT'
httpServer.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

// Admin SignIn
AuthAdmin();
