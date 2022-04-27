import express from "express";
import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
import authenticate from "../middleware/authenticate.js";
import crypto from "crypto";
const router = express.Router();

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
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

// this is for user follow logic if both of them follow then they will be as a friends
router.post("/u/follow", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const { email, userID } = req.body;
    // these are the followed to user id and email
    if (!email && !userID) {
      return res.status(400).json({ success: false, msg: "unauthorized user" });
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

router.post("/u/unfollow", authenticate, async (req, res) => {
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

router.post("/post/like", authenticate, async (req, res) => {
  try {
    const { postID, to } = req.body;
    if (!postID || !to) {
      return res
        .status(422)
        .json({ success: false, msg: "Please Send PostID, by, To Filled" });
    }
    const findUser = await userDetail.findOne(
      {
        userID: to,
      },
      {
        name: 1,
        email: 1,
        userID: 1,
      }
    );
    if (!findUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User Doesn't exist" });
    }
    const doesRootUserAlreadyLiked = await userDetail.findOne(
      // here we are finding the post using postID and does rootuser already liked this post of not
      {
        userID: to,
        posts: {
          $elemMatch: {
            id: postID,
            "likes.by": {
              $elemMatch: {
                userID: req.rootUser.userID,
              },
            },
          },
        },
      },
      {
        posts: {
          $elemMatch: {
            id: postID,
            "likes.by": {
              $elemMatch: {
                userID: req.rootUser.userID,
              },
            },
          },
        },
      }
    );
    if (doesRootUserAlreadyLiked) {
      const removeLikedPostRes = await userDetail.updateOne(
        {
          userID: to,
        },
        {
          $pull: {
            "posts.$[field].likes.by": {
              userID: req.rootUser.userID,
            },
          },
          $inc: {
            "posts.$[field].likes.No": -1,
          },
        },
        {
          arrayFilters: [{ "field.id": postID }],
        }
      );
      if (!removeLikedPostRes) {
        return res.status(500).json({
          success: false,
          msg: "server Error, Please try again letter!!!",
        });
      }
      return res.json({
        success: true,
        msg: "Removed Like",
        removed: true,
      });
    }
    const likePostRes = await userDetail.updateOne(
      {
        userID: to,
      },
      {
        $push: {
          "posts.$[field].likes.by": {
            userID: req.rootUser.userID,
          },
        },
        $inc: {
          "posts.$[field].likes.No": 1,
        },
      },
      {
        arrayFilters: [{ "field.id": postID }],
      }
    );
    if (!likePostRes) {
      return res.status(500).json({
        success: false,
        msg: "server Error, Please try again letter!!!",
      });
    }
    return res.json({
      success: true,
      msg: "Successfully Liked the post",
      removed: false,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server Error, Please try again letter!!!",
    });
  }
});

router.post("/post/comment", authenticate, async (req, res) => {
  try {
    const { comment, postID, to } = req.body;
    if (!comment) {
      return res.status(204).json({
        success: false,
        msg: "Comment Field is Empty, Please fill the filed",
      });
    }
    if ((!postID, !to)) {
      return res
        .status(300)
        .json({ success: false, msg: "Client Error, Please Try again later" });
    }
    const findUser = await userDetail.findOne(
      {
        userID: to,
      },
      { name: 1, email: 1, userID: 1 }
    );
    if (!findUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized User" });
    }
    const commentOnUserPostRes = await userDetail.updateOne(
      { userID: to },
      {
        $push: {
          "posts.$[field].comments.by": {
            userID: req.rootUser.userID,
            comment,
            picture: req.rootUser.picture,
          },
        },
        $inc: {
          "posts.$[field].comments.No": 1,
        },
      },
      {
        arrayFilters: [{ "field.id": postID }],
      }
    );
    if (!commentOnUserPostRes) {
      return res.status(500).json({ success: false, msg: "Server Error" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Commented Successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Error, Please try again Letter...",
    });
  }
});

export default router;
