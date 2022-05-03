import userDetail from "../models/userDetail_model.js";
import { Request, Response } from "express";

export default {
  like: async (req: Request, res: Response): Promise<object> => {
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
  },
  comment: async (req: Request, res: Response): Promise<object> => {
    try {
      const { comment, postID, to } = req.body;
      if (!comment) {
        return res.status(400).json({
          success: false,
          msg: "Comment Field is Empty, Please fill the filed",
        });
      }
      if (!postID && !to) {
        return res.status(400).json({
          success: false,
          msg: "Client Error, Please Try again later",
        });
      }
      const findUser = await userDetail.findOne(
        {
          userID: to,
        },
        { name: 1, email: 1, userID: 1 }
      );
      if (!findUser) {
        return res
          .status(401)
          .json({ success: false, msg: "Unauthorized User" });
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
      return res.status(500).json({
        success: false,
        msg: "Server Error, Please try again Letter...",
      });
    }
  },
};
