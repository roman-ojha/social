import passport from "passport";
import userDetail from "../models/userDetail_model.js";
import crypto from "crypto";
import GoogleOauth2 from "passport-google-oauth2";
import { signInAdmin } from "../funcs/AuthAdmin.js";
import SchemaMethodInstance from "../interface/userSchemaMethods.js";
import {
  UserDocumentFollower,
  UserDocumentFollowing,
  UserDocumentFriends,
  UserDocumentMessages,
  UserDocumentNotification,
} from "../interface/userDocument.js";

const GoogleStrategy = GoogleOauth2.Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const userExist = await userDetail.findOne(
          { email: profile.email },
          { name: 1, email: 1, userID: 1, id: 1 }
        );
        if (userExist) {
          // if the user exist but had already signup from the social Accout
          // i had not complete this feture but, will be complete in future
          return done(null, userExist);
        } else {
          const newUserId = crypto.randomBytes(16).toString("hex");
          const postID = crypto.randomBytes(16).toString("hex");
          const today = new Date();
          const name = profile.displayName;
          const email = profile.email;
          const picture = profile.picture;
          const googleID = profile.id;
          const adminEmail = process.env.ADMIN_LOGIN_EMAIL;
          const adminPassword = process.env.ADMIN_LOGIN_PASSWORD;
          const adminCpassword = process.env.ADMIN_LOGIN_PASSWORD;
          const resAdmin = await signInAdmin({
            email: adminEmail,
            password: adminPassword,
            cpassword: adminCpassword,
          });
          if (resAdmin.success && resAdmin.admin) {
            // if Admin Exist
            const newUser: SchemaMethodInstance & {
              _id: any;
            } = new userDetail({
              googleID: googleID,
              id: newUserId,
              name: name,
              email: email,
              picture: picture,
              postNo: 1,
              followingNo: 1,
              following: [
                <UserDocumentFollowing>{
                  id: resAdmin.admin.id,
                },
              ],
              followersNo: 1,
              followers: [
                <UserDocumentFollower>{
                  id: resAdmin.admin.id,
                },
              ],
              friendsNo: 1,
              friends: [
                <UserDocumentFriends>{
                  id: resAdmin.admin.id,
                },
              ],
              notification: [
                <UserDocumentNotification>{
                  topic: "follow",
                  user: resAdmin.admin.id,
                },
              ],
              posts: [
                {
                  id: postID,
                  caption: `${name} Update the Profile Picture`,
                  picture: {
                    url: picture,
                  },
                  likes: {
                    No: 0,
                  },
                  comments: {
                    No: 0,
                  },
                },
              ],
              stories: {
                caption: `${name} Update the Profile Picture`,
                picture: picture,
                date: `${today.toLocaleString("default", {
                  month: "long",
                })} ${today.getDate()}, ${today.getFullYear()}`,
              },
              messages: [
                <UserDocumentMessages>{
                  lastMessageOn: new Date(),
                  messageToId: resAdmin.admin.id,
                  message: [
                    {
                      senderId: resAdmin.admin.id,
                      content: `Hello ${name}`,
                      date: new Date(),
                    },
                  ],
                },
              ],
            });
            const resSaveUserWithAdmin = await newUser.save();
            if (!resSaveUserWithAdmin) {
              return done(null, null);
            }
            const updateAdminDocument = await userDetail.updateOne(
              {
                id: resAdmin.admin.id,
              },
              {
                // pushing the new followers into followed to user database
                $push: {
                  followers: <UserDocumentFollower>{
                    id: newUserId,
                  },
                  following: <UserDocumentFollowing>{
                    id: newUserId,
                  },
                  friends: <UserDocumentFriends>{
                    id: newUserId,
                  },
                  messages: <UserDocumentMessages>{
                    lastMessageOn: new Date(),
                    messageToId: newUserId,
                    message: [
                      {
                        senderId: resAdmin.admin.id,
                        content: `Hello ${name}`,
                        date: new Date(),
                      },
                    ],
                  },
                  notification: <UserDocumentNotification>{
                    topic: "follow",
                    user: newUserId,
                  },
                },
                $inc: {
                  followersNo: 1,
                  followingNo: 1,
                  friendsNo: 1,
                },
              }
            );
            if (!updateAdminDocument) {
              return done(null, null);
            }
            return done(null, resSaveUserWithAdmin);
          }
          const newUserWithOutAdmin = new userDetail({
            googleID: googleID,
            id: newUserId,
            name: name,
            email: email,
            picture: picture,
            followersNo: 0,
            followingNo: 0,
            postNo: 1,
            friendsNo: 0,
            posts: [
              {
                id: postID,
                caption: `${name} Update the Profile Picture`,
                picture: {
                  url: picture,
                },
                likes: {
                  No: 0,
                },
                comments: {
                  No: 0,
                },
              },
            ],
            stories: {
              caption: `${name} Update the Profile Picture`,
              picture: picture,
              date: `${today.toLocaleString("default", {
                month: "long",
              })} ${today.getDate()}, ${today.getFullYear()}`,
            },
          });
          const resSavedUserWithoutAdmin = await newUserWithOutAdmin.save();
          return done(null, resSavedUserWithoutAdmin);
        }
      } catch (err) {
        return done(null, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

function isLoggedIn(req, res, next) {
  try {
    req.user ? next() : res.sendStatus(401);
  } catch (err) {}
}

export default isLoggedIn;
export { passport };
