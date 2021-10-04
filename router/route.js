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
        followersNo: 0,
        followingNo: 0,
        postNo: 0,
        friendsNo: 0,
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

router.post("/u/search", async (req, res) => {
  try {
    if (req.body.name.length === 0) {
      return res.status(201).json([]);
    }
    const resUser = await userDetail.find(
      {
        name: { $regex: "^" + req.body.name, $options: "i" },
      },
      { name: 1, picture: 1, userID: 1, email: 1 }
    );
    return res.status(201).json(resUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/u/profile/:userid", async (req, res) => {
  try {
    // getting userid form url parameter
    const userID = req.params.userid;
    // console.log("hello");
    console.log(userID);
    const rootUser = await userDetail.findOne({ userID: userID });
    if (!rootUser) {
      return res.status(401).json({ error: "User doesnot exist" });
    }
    return res.status(201).json(rootUser);
  } catch (err) {}
});

// this is for user follow logic if both of them follow then they will be as a friends
router.post("/u/follow", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const { email, userID } = req.body;
    // these are the followed to user id and email
    if (!email && !userID) {
      return res.status(400).json({ error: "unauthorized user" });
    }
    const followUserExist = await userDetail.findOne({
      // here we are finding only the user which is followed by rootuser to user who is being followed
      // if it doesn't exist only after that we will going to go forther to save the data if it exist it means he had already follwed the user
      userID: rootUser.userID,
      following: {
        $elemMatch: {
          userID: userID,
        },
      },
    });
    if (followUserExist) {
      return res
        .status(200)
        .json({ message: "you had already followed this user" });
    }
    const followedToUser = await userDetail.findOne(
      {
        userID: userID,
      },
      {
        email: 1,
        name: 1,
        userID: 1,
        picture: 1,
      }
    );
    if (!followedToUser) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const followRes = await rootUser.followUser(followedToUser);
    if (!followRes) {
      return res.status(500).json({ error: "Server error" });
    }
    // logic to store as a friend if both of them had followed
    // we had already check for rootUser that that does rootUser followed the other user
    // now we just have to check does other user follow rootUser if then then save it as a friend

    const rootUserExistInFollowUser = await userDetail.findOne({
      userID: userID,
      following: {
        $elemMatch: {
          userID: rootUser.userID,
        },
      },
    });
    if (rootUserExistInFollowUser) {
      // if root userExist in followed user only at that time we are porforming this task
      const followUserExistInRootUser = await userDetail.findOne({
        userID: rootUser.userID,
        following: {
          $elemMatch: {
            userID: userID,
          },
        },
      });
      if (followUserExistInRootUser) {
        // if both of them follow then this will run
        // storing as a friend to rootuser
        await userDetail.updateOne(
          {
            userID: rootUser.userID,
          },
          {
            // pushing the new followers into followed to user database
            $push: {
              friends: {
                name: followedToUser.name,
                email: followedToUser.email,
                userID: followedToUser.userID,
                picture: followedToUser.picture,
              },
            },
            $inc: {
              friendsNo: 1,
            },
          }
        );
        // storing as a friend to followedToUser
        await userDetail.updateOne(
          {
            userID: followedToUser.userID,
          },
          {
            // pushing the new followers into followed to user database
            $push: {
              friends: {
                name: rootUser.name,
                email: rootUser.email,
                userID: rootUser.userID,
                picture: rootUser.picture,
              },
            },
            $inc: {
              friendsNo: 1,
            },
          }
        );
      }
    }
    return res.status(200).json({ message: "Follow successfully" });
  } catch (err) {}
  res.send("hello");
});

export default router;
