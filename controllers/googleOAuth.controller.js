import UserDetail from "../models/userDetail_model.js";
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

export default {
  loginSuccess: async (req, res) => {
    // here if user login form google after that we are finding the email of that on data base and generating token for that user and after that store that token in cookie
    // and after that we are redirecting to the homepage after that there we will check the does token get match or not if it get match then we will send the data from the user into the home page
    const userLogin = await UserDetail.findOne(
      { email: req.user.email },
      {
        email: 1,
        userID: 1,
        name: 1,
        picture: 1,
      }
    );
    try {
      let token;
      token = await userLogin.generateAuthToken();
      res.cookie("AuthToken", token, {
        // expires: new Date(Date.now() + 25892000000),
        maxAge: 25892000000,
        httpOnly: true,
        domain: "rsocial.vercel.app",
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      });
      // console.log(userLogin.userID);
      if (userLogin.userID === undefined) {
        res.redirect(`${CLIENT_BASE_URL}/userid?uid=undefined`);
      } else {
        res.redirect(`${CLIENT_BASE_URL}/userid`);
      }
    } catch (err) {
      // console.log(err);
    }
  },
  loginFail: (req, res) => {
    res
      .status(401)
      .json({ error: "Something went wrong, try again letter..." });
  },
};
