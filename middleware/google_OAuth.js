/* eslint-disable import/no-unresolved */
import passport from "passport";
import crypto from "crypto";
import GoogleOauth2 from "passport-google-oauth2";
import UserDetail from "../models/userDetail_model.js";

const GoogleStrategy = GoogleOauth2.Strategy;
const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/google/callback`,
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const userExist = await UserDetail.findOne({ email: profile.email }, { name: 1, email: 1, userID: 1 });
        if (userExist) {
          // if the user exist but had already signup from the social Accout
          // i had not complete this feture but, will be complete in future
          return done(null, userExist);
        }
        const id = crypto.randomBytes(16).toString("hex");
        const postID = crypto.randomBytes(16).toString("hex");
        const today = new Date();
        const userData = new UserDetail({
          googleID: profile.id,
          id,
          name: profile.displayName,
          email: profile.email,
          picture: profile.picture,
          followersNo: 0,
          followingNo: 0,
          postNo: 1,
          friendsNo: 0,
          storiesNo: 0,
          posts: [
            {
              id: postID,
              caption: `${profile.displayName} Update the Profile Picture`,
              picture: {
                url: profile.picture
              },
              likes: {
                No: 0
              },
              comments: {
                No: 0
              }
            }
          ],
          stories: {
            caption: `${profile.displayName} Update the Profile Picture`,
            picture: profile.picture,
            date: `${today.toLocaleString("default", {
              month: "long"
            })} ${today.getDate()}, ${today.getFullYear()}`
          }
        });
        const createUser = await userData.save();
        return done(null, createUser);
      } catch (err) {
        // console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

function isLoggedIn(req, res, next) {
  try {
    // eslint-disable-next-line no-unused-expressions
    req.user ? next() : res.sendStatus(401);
  } catch (err) {
    //
  }
}

export default isLoggedIn;
export { passport };
