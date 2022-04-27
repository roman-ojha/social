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

router.get("/u/profile/:userid", authenticate, async (req, res) => {
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

// this route had implemented into "/u/getMessage" route when message doesn't exist
router.post("/u/createMessage", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const receiverUser = req.body.receiver;
    if (!req.body.receiver) {
      return res.status(401).json({ error: "receiver Doesn't exist" });
    }
    const receiverExist = await userDetail.findOne({
      // searching that user to message if it exist
      userID: receiverUser,
    });
    if (!receiverExist) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const messageExist = await userDetail.findOne({
      userID: rootUser.userID,
      messages: {
        $elemMatch: {
          messageTo: receiverUser,
        },
      },
    });
    if (!messageExist) {
      // if initialize message doesn't exist then we have to create a field for both user
      const resSaveRootMsg = await userDetail.updateOne(
        // creating and saving message to rootUser
        {
          userID: rootUser.userID,
        },
        {
          $push: {
            messages: {
              messageTo: receiverUser,
              receiverPicture: receiverExist.picture,
              message: [],
            },
          },
        }
      );
      const resSaverReciverMsg = await userDetail.updateOne(
        // creating and saving message to rootUser
        {
          userID: receiverUser,
        },
        {
          $push: {
            messages: {
              messageTo: rootUser.userID,
              receiverPicture: rootUser.picture,
              message: [],
            },
          },
        }
      );
      if (resSaverReciverMsg && resSaveRootMsg) {
        return res.status(200).json({ message: "message created" });
      } else {
        return res.status(500).json({ error: "server error" });
      }
    } else {
      return res.status(200).json({ message: "Message already been created" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

router.post("/u/getMessage", authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    const receiverUserID = req.body.userID;
    if (!receiverUserID) {
      return res
        .status(404)
        .json({ success: false, err: "Receiver user doesn't exist" });
    }
    const receiverExist = await userDetail.findOne({
      // searching that user to message if it exist
      userID: receiverUserID,
    });
    if (!receiverExist) {
      return res
        .status(404)
        .json({ success: false, err: "User doesn't exist" });
    }
    const userMessage = await userDetail.findOne(
      {
        // getting rootUser message if the given condition match
        userID: rootUser.userID,
        messages: {
          $elemMatch: {
            messageTo: receiverUserID,
          },
        },
      },
      {
        messages: {
          $elemMatch: {
            messageTo: receiverUserID,
          },
        },
      }
    );
    if (!userMessage) {
      // if message doesn't exist already then we have to create a new message which would contain the empty message
      const roomID = crypto.randomBytes(16).toString("hex");
      // generating new room id for those spacific user room to join on socket
      const resSaveRootMsg = await userDetail.updateOne(
        // creating and saving message to rootUser
        {
          userID: rootUser.userID,
        },
        {
          $push: {
            messages: {
              messageTo: receiverUserID,
              receiverPicture: receiverExist.picture,
              roomID: roomID,
              message: [],
            },
          },
        }
      );
      const resSaverReciverMsg = await userDetail.updateOne(
        // creating and saving message to rootUser
        {
          userID: receiverUserID,
        },
        {
          $push: {
            messages: {
              messageTo: rootUser.userID,
              receiverPicture: rootUser.picture,
              roomID: roomID,
              message: [],
            },
          },
        }
      );
      if (resSaverReciverMsg && resSaveRootMsg) {
        return res.status(200).json({ success: true, msg: "message created" });
      } else {
        return res.status(500).json({ success: false, err: "server error" });
      }
    }
    res.status(200).json(userMessage.messages[0]);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, err: "Server Error!!, Please Try again letter" });
  }
});

// This route had already implemented in socket/io.js
router.post("/u/sendMessage", authenticate, async (req, res) => {
  // we are including pusher package to make message realtime
  try {
    const rootUser = req.rootUser;
    const receiverUser = req.body.messageTo;
    if (!req.body.messageTo) {
      return res
        .status(401)
        .json({ error: "please fill reciver userID properly" });
    }
    // if message already created then we just have to save
    const resSaveReciverMsg = await userDetail.updateOne(
      // creating and saving message to rootUser
      {
        userID: receiverUser,
      },
      {
        $push: {
          "messages.$[field].message": {
            // pushing message inside the message array which match the condition of "messageBy"==='rootUser.userID'
            sender: rootUser.userID,
            content: req.body.message,
            date: Date(),
          },
        },
      },
      {
        arrayFilters: [{ "field.messageTo": rootUser.userID }],
        // here we are filtering the messageBy
      }
    );
    if (!resSaveReciverMsg.matchedCount) {
      // this will run if update doesn't happen in database it might be because of user doesn't exist
      // NOTE: i am doing this process to reduce the query for database so that the number of query became small and will be fast
      return res
        .status(400)
        .json({ error: "User doesn't exist or Message doesn't created" });
    }
    // if reciver exist and will update the message there then we can update the message for rootuser as well
    const resSaveSenderMsg = await userDetail.updateOne(
      // creating and saving message to rootUser
      {
        userID: rootUser.userID,
      },
      {
        $push: {
          "messages.$[field].message": {
            // pushing message inside the message array which match the condition of "messageBy"==='rootUser.userID'
            sender: rootUser.userID,
            content: req.body.message,
            date: Date(),
          },
        },
      },
      {
        arrayFilters: [{ "field.messageTo": receiverUser }],
        // here we are filtering the messageBy
      }
    );
    // triggering pusher here to create a message
    // pusher.trigger("chat", "message", {
    //   // here we are trigurring only those client whose subscript with `${rootUser.userID} ${receiverUser}`
    //   sender: rootUser.userID,
    //   content: req.body.message,
    //   date: Date(),
    // });
    return res.status(200).json({ message: "message send" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server Error!!, Please Try again letter" });
  }
});

router.post("/changeProfile/imgUrl", authenticate, async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;
    const rootUser = req.rootUser;
    if (!imageUrl) {
      return res.json({ success: false, msg: "Please Fill Image URL" });
    }
    const caption = `${rootUser.userID} Update The Profile Picture`;
    const postID = crypto.randomBytes(16).toString("hex");
    const userPostDetail = {
      id: postID,
      caption: caption,
      picture: {
        url: imageUrl,
      },
      likes: {
        No: 0,
      },
      comments: {
        No: 0,
      },
    };
    await rootUser.uploadPost(userPostDetail);
    await userDetail.updateOne(
      {
        userID: rootUser.userID,
      },
      { $set: { picture: imageUrl } }
    );
    return res.send({
      success: true,
      msg: "Successfully Change Profile Picture",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server Error, Please try again letter!!!",
    });
  }
});

router.post("/changeUserID", authenticate, async (req, res) => {
  try {
    const newUserID = req.body.newUserID;
    const oldUserID = req.rootUser.userID;
    if (!newUserID) {
      return res
        .status(204)
        .json({ success: false, msg: "Please Fill the userID Field" });
    }
    const userIDAlreadyExist = await userDetail.findOne({ userID: newUserID });
    if (userIDAlreadyExist) {
      return res.json({
        success: false,
        msg: "given userID already Exist, Please Try another one",
      });
    }
    const changeUserIDRes = await userDetail.updateOne(
      {
        userID: oldUserID,
      },
      { $set: { userID: newUserID } }
    );
    if (changeUserIDRes) {
      return res.json({
        success: true,
        msg: "Successfully Changed userID",
        userID: newUserID,
      });
    }
    return res.status(500).json({
      success: false,
      msg: "server Error, Please try again letter!!!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server Error, Please try again letter!!!",
    });
  }
});

router.post("/changeName", authenticate, async (req, res) => {
  try {
    const newName = req.body.newName;
    const rootUser = req.rootUser;
    if (!newName) {
      return res
        .status(204)
        .json({ success: false, msg: "Please Fill the displayName Field" });
    }
    const changeNameRes = await userDetail.updateOne(
      {
        userID: rootUser.userID,
      },
      { $set: { name: newName } }
    );
    if (changeNameRes) {
      return res.json({
        success: true,
        msg: "Successfully Changed display Name",
        name: newName,
      });
    }
    return res.status(500).json({
      success: false,
      msg: "server Error, Please try again letter!!!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "server Error, Please try again letter!!!",
    });
  }
});

router.post("/changePassword", authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword, cNewPassword } = req.body;
    if (!cNewPassword || !oldPassword || !newPassword) {
      return res
        .status(204)
        .json({ success: false, msg: "Please fill the field properly" });
    }
    if (newPassword !== cNewPassword) {
      return res
        .status(204)
        .json({ success: false, msg: "password doesn't match" });
    }
    const nPassword = await bcrypt.hash(newPassword, 12);
    const userRes = await userDetail.findOne(
      {
        userID: req.rootUser.userID,
      },
      {
        password: 1,
      }
    );
    const isPasswordMatch = await bcrypt.compare(oldPassword, userRes.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Old Password is incorrect" });
    }
    const changePassRes = await userDetail.updateOne(
      {
        userID: req.rootUser.userID,
      },
      {
        $set: { password: nPassword, cpassword: nPassword },
      }
    );
    if (!changePassRes) {
      return res.status(500).json({ success: false, msg: "Server Error" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Changed Password Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server Error" });
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
