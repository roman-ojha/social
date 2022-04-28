import express from "express";
import userDetail from "../models/userDetail_model.js";
import authenticate from "../middleware/authenticate.js";
import fs from "fs";
const userRoute = express.Router();

var botUser = [];
fs.readFile("./db/botUser.json", "utf-8", (err, user) => {
  botUser = JSON.parse(user);
});

userRoute.get("/", authenticate, async (req, res) => {
  // writing logic to get all rootUser and rootUser follow user post
  // console.log(req.rootUser.friends);
  try {
    let getUserPost;
    const currentDate = new Date();
    const getUserPostFunction = async (getPastDate) => {
      // getPastDate will get those date from which we want to user post filed
      const dateCurrentDateEarly = new Date(currentDate);
      dateCurrentDateEarly.setDate(
        dateCurrentDateEarly.getDate() - getPastDate
      );
      getUserPost = await userDetail.find(
        // finding those user which i follow and get the posts of them
        // and finding post which is {getPastDate} days early
        {
          followers: {
            $elemMatch: {
              userID: req.rootUser.userID,
            },
          },
          posts: {
            $elemMatch: {
              date: { $gt: dateCurrentDateEarly },
            },
          },
        },
        {
          posts: { $slice: [0, 5] },
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
        }
      );
      return getUserPost;
    };
    getUserPost = await getUserPostFunction(5);
    if (getUserPost.length === 0) {
      // if there is not any post which is fivedays early
      getUserPost = await getUserPostFunction(30);
      if (getUserPost.length === 0) {
        // if there is not any post which is 30 days early
        getUserPost = await getUserPostFunction(90);
        if (getUserPost.length === 0) {
          // if there is not any post which is 90 days early
          getUserPost = await getUserPostFunction(180);
          if (getUserPost.length === 0) {
            // if there is not any post which is 180 days early
            getUserPost = await getUserPostFunction(365);
            if (getUserPost.length === 0) {
              // if there is not any post which is 365 days early
              getUserPost = await getUserPostFunction(1825);
            } else {
              // if there is not any post which is 5 year early
              getUserPost = await getUserPostFunction(36500);
              // then post which is 100 years early
            }
          }
        }
      }
    }
    // getting/creating data for Suggestion for You and followed By block
    let userSuggestion = await userDetail.aggregate([
      //getting the document that is not rootUser & and the user which is not friend of rootUser
      {
        $match: {
          $and: [
            { "friends.userID": { $not: { $eq: req.rootUser.userID } } },
            { "followers.userID": { $not: { $eq: req.rootUser.userID } } },
            { userID: { $not: { $eq: req.rootUser.userID } } },
          ],
        },
      },
      {
        // getting only required field
        $project: {
          picture: 1,
          name: 1,
          userID: 1,
          email: 1,
          _id: 0,
        },
      },
      { $sample: { size: 5 } },
    ]);
    const lengthOfuserSuggestion = userSuggestion.length;
    for (let i = 0; i < 5 - lengthOfuserSuggestion; i++) {
      // pushing but user according to the user that are avilable in original userSuggestion data
      userSuggestion.push(botUser[i]);
    }
    // getting/create data for Followed by user block in client site
    let followedBy = await userDetail.aggregate([
      {
        $match: {
          $and: [
            { "friends.userID": { $not: { $eq: req.rootUser.userID } } },
            { "following.userID": req.rootUser.userID },
          ],
        },
      },
      {
        // getting only required field
        $project: {
          picture: 1,
          name: 1,
          userID: 1,
          _id: 0,
        },
      },
      { $sample: { size: 5 } },
    ]);
    const lengthOfFollowedBy = followedBy.length;
    for (let i = botUser.length - 1; i >= lengthOfFollowedBy; i--) {
      followedBy.push(botUser[i]);
    }

    let userStories = await userDetail.aggregate([
      {
        $match: {
          $and: [
            { "followers.userID": req.rootUser.userID },
            { storiesNo: { $gt: 0 } },
          ],
        },
      },
      {
        $project: {
          picture: 1,
          userID: 1,
          name: 1,
          stories: 1,
          _id: 0,
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const lengthOfUserStories = userStories.length;
    for (let i = botUser.length - 1; i >= lengthOfUserStories; i--) {
      userStories.push(botUser[i]);
    }
    return res.status(200).json({
      userProfileDetail: req.rootUser,
      followedUserPost: getUserPost,
      userSuggestion,
      followedBy,
      userStories,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Server Error, Please Try again letter" });
  }
});

userRoute.get("/u", authenticate, (req, res) => {
  try {
    const rootUser = req.rootUser;
    return res.status(200).json(rootUser);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

userRoute.get("/u/profile/:userid", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const userID = req.params.userid;
    const searchedUser = await userDetail.findOne({ userID: userID });
    if (!searchedUser) {
      return res
        .status(401)
        .json({ success: false, err: "User doesn't exist" });
    } else {
      const isRootUserFollowed = await userDetail.findOne({
        userID: rootUser.userID,
        following: {
          $elemMatch: {
            userID: userID,
          },
        },
      });
      if (!isRootUserFollowed) {
        return res
          .status(200)
          .json({ success: true, searchedUser, isRootUserFollowed: false });
      } else {
        return res
          .status(200)
          .json({ success: true, searchedUser, isRootUserFollowed: true });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, err: "Server Error!!, Please Try again letter" });
  }
});

userRoute.post("/u/search", async (req, res) => {
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
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

// this is for user follow logic if both of them follow then they will be as a friends
userRoute.post("/u/follow", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const { email, userID } = req.body;
    // these are the followed to user id and email
    if (!email && !userID) {
      return res.status(404).json({ success: false, msg: "unauthorized user" });
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
      return res.status(200).json({
        success: false,
        message: "you had already followed this user",
      });
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
      return res
        .status(400)
        .json({ success: false, msg: "User doesn't exist" });
    }
    const followRes = await rootUser.followUser(followedToUser);
    if (!followRes) {
      return res.status(500).json({ success: false, msg: "Server error" });
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
    return res.status(200).json({ success: true, msg: "Follow successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

userRoute.post("/u/unfollow", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const { email, userID } = req.body;
    // NOTE userID = user that rootUser is trying to search or query
    if (!email && !userID) {
      return res.status(404).json({ success: false, err: "unauthorized user" });
    }
    const unFollowUserExistOnRootUser = await userDetail.findOne({
      userID: rootUser.userID,
      following: {
        $elemMatch: {
          userID: userID,
        },
      },
    });

    if (!unFollowUserExistOnRootUser) {
      return res.status(404).json({
        success: false,
        err: "you hadn't followed this user yet",
      });
    }
    const unFollowedToUserExist = await userDetail.findOne(
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
    if (!unFollowedToUserExist) {
      return res
        .status(404)
        .json({ success: false, err: "User doesn't exist" });
    }
    // const followRes = await rootUser.unFollowUser(unFollowedToUserExist);
    let unFollowRes = await userDetail.updateOne(
      {
        userID: rootUser.userID,
      },
      {
        $pull: { following: { userID: userID } },
        $inc: {
          followingNo: -1,
        },
      }
    );
    if (!unFollowRes) {
      return res.status(500).json({
        success: false,
        err: "Server error!!, Please try again later",
      });
    }
    unFollowRes = await userDetail.updateOne(
      {
        userID: userID,
      },
      {
        $pull: { followers: { userID: rootUser.userID } },
        $inc: {
          followersNo: -1,
        },
      }
    );
    if (!unFollowRes) {
      return res.status(500).json({
        success: false,
        err: "Server error!!, Please Try again later",
      });
    }
    const friendExist = await userDetail.findOne({
      userID: rootUser.userID,
      friends: {
        $elemMatch: {
          userID: userID,
        },
      },
    });
    if (!friendExist) {
      return res
        .status(200)
        .json({ success: true, msg: "UnFollowed User Successfully" });
    }
    let unfriendRes = await userDetail.updateOne(
      {
        userID: rootUser.userID,
      },
      {
        $pull: { friends: { userID: userID } },
        $inc: {
          friendsNo: -1,
        },
      }
    );
    if (!unfriendRes) {
      return res.status(500).json({
        success: false,
        msg: "Server error!!, Please Try again later",
      });
    }
    unfriendRes = await userDetail.updateOne(
      {
        userID: userID,
      },
      {
        $pull: { friends: { userID: rootUser.userID } },
        $inc: {
          friendsNo: -1,
        },
      }
    );
    if (!unfriendRes) {
      return res.status(500).json({
        success: false,
        msg: "Server error!!, Please Try again later",
      });
    }
    return res
      .status(200)
      .json({ success: true, msg: "UnFollowed User Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

export default userRoute;
