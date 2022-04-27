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

export default userRoute;
