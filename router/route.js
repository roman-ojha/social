import express from "express";
const router = express.Router();
import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
import authenticate from "../middleware/authenticate.js";

router.get("/u", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/register", (req, res) => {
  console.log("register");
  const { name, email, password, cpassword, birthday, gender } = req.body;
  if (!name || !email || !password || !cpassword || !birthday || !gender) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  if (password !== cpassword) {
    return res.status(422).json({ error: "Password doesn't match" });
  }
  userDetail
    .findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already Exist" });
      }
      const creatingUserData = new userDetail({
        name,
        email,
        password,
        cpassword,
        birthday,
        cpassword,
        gender,
      });
      creatingUserData
        .save()
        .then(() => {
          return res
            .status(201)
            .json({ message: "User register successfully" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Failed registerd!!!" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the form properly" });
    }
    const userLogin = await userDetail.findOne({ email: email });
    if (!userLogin) {
      return res.status(400).json({ error: "Error Login! User does't exist" });
    } else {
      const isPasswordMatch = await bcrypt.compare(
        password,
        userLogin.password
      );
      if (!isPasswordMatch) {
        res.status(400).json({ error: "Username and password doesn't match" });
      } else {
        let token = await userLogin.generateAuthToken();
        res.cookie("AuthToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ message: "Login Successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/u/logout", authenticate, (req, res) => {
  res.clearCookie("AuthToken", { path: "/" });
  res.status(200).send("User Logout");
});

export default router;
