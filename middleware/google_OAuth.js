import passport from "passport";
import userDetail from "../models/userDetail_model.js";
import crypto from "crypto";

import GoogleOauth2 from "passport-google-oauth2";
const GoogleStrategy = GoogleOauth2.Strategy;
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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
        let token;
        const userExist = await userDetail.findOne({ email: profile.email });
        if (userExist) {
          // if the user exist but had already signup from the social Accout
          // i had not complete this feture but, will be complete in future
          return done(null, userExist);
        } else {
          const id = crypto.randomBytes(16).toString("hex");
          const userData = new userDetail({
            googleID: profile.id,
            id,
            name: profile.displayName,
            email: profile.email,
            picture: profile.picture,
            followersNo: 0,
            followingNo: 0,
            postNo: 0,
            friendsNo: 0,
            storiesNo: 0,
          });
          const createUser = await userData.save();
          return done(null, createUser);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

export default isLoggedIn;
