import { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import postRoute from "../routes/post.js";
import userRoute from "../routes/user.js";
import userAuthRoute from "../routes/userAuth.js";
import messageRoute from "../routes/message.js";
import settingRoute from "../routes/setting.js";
import storageRouter from "../routes/storageRoute.js";
import google_OAuth_route from "../routes/google_OAuth_route.js";
// import youtubeRoute from "../routes/youtube.js";
import scrapRoute from "../routes/scrap.js";
import cors from "cors";
import bodyParser from "body-parser";
import { httpServer, app } from "../socket/io.js";
const PORT = process.env.PORT;

// For Production =======
// import connectMongo from "connect-mongo";
// const MongoStore = new connectMongo(session);
import session from "express-session";
import connectMemoryStore from "memorystore";
const MemoryStore = new connectMemoryStore(session);

// For production =========
// app.set("truest proxy", 1);
app.use(
  session({
    cookie: {
      secure: true,
      maxAge: 25892000000,
    },
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cookieParser());
// app.unsubscribe(express.json());

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
// app.use(youtubeRoute);
app.use(scrapRoute);
import "../socket/io.js";

// using google authentication function

app.use(google_OAuth_route);

// listening to a 'PORT'
httpServer.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
