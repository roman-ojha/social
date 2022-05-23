import userDetail from "../models/userDetail_model.js";
import { Request, Response } from "express";
import ResponseObject from "interface/responseObject.js";
import ResPonseUserPost from "interface/resUserPost.js";

export default {
  like: async (req: Request, res: Response): Promise<object> => {
    try {
      const { postID, toUserId, toId, likeNo } = req.body;
      if (!postID || !toUserId || !toId) {
        return res.status(422).json(<ResponseObject>{
          success: false,
          msg: "Some this went wrong while getting essential data, please report it",
        });
      }
      const findUser = await userDetail.findOne(
        {
          id: toId,
        },
        {
          name: 1,
          email: 1,
          userID: 1,
          id: 1,
        }
      );
      if (!findUser) {
        return res
          .status(404)
          .json(<ResponseObject>{ success: false, msg: "User Doesn't exist" });
      }
      const doesRootUserAlreadyLiked = await userDetail.findOne(
        // here we are finding the post using postID and does rootuser already liked this post of not
        {
          id: toId,
          posts: {
            $elemMatch: {
              id: postID,
              "likes.by": {
                $elemMatch: {
                  user: req.rootUser.id,
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
                  user: req.rootUser.id,
                },
              },
            },
          },
        }
      );
      if (doesRootUserAlreadyLiked) {
        // Undo like
        const removeLikedPostRes = await userDetail.updateOne(
          {
            id: toId,
          },
          {
            $pull: {
              "posts.$[field].likes.by": {
                user: req.rootUser.id,
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
          return res.status(500).json(<ResponseObject>{
            success: false,
            msg: "server Error, Please try again letter!!!",
          });
        }
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "Removed Like",
          likeNo: likeNo - 1,
          removed: true,
        });
      }
      // Like
      const likePostRes = await userDetail.updateOne(
        {
          id: toId,
        },
        {
          $push: {
            "posts.$[field].likes.by": {
              user: req.rootUser.id,
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
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "server Error, Please try again letter!!!",
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successfully Liked the post",
        likeNo: likeNo + 1,
        removed: false,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "server Error, Please try again letter!!!",
      });
    }
  },
  comment: async (req: Request, res: Response): Promise<object> => {
    try {
      const { comment, postID, toId, toUserId } = req.body;
      if (!comment) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Comment Field is Empty, Please fill the filed",
        });
      }
      if (!postID || !toId || !toUserId) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Client Error, Please Try again later",
        });
      }
      const findUser = await userDetail.findOne(
        {
          id: toId,
        },
        { name: 1, email: 1, userID: 1 }
      );
      if (!findUser) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "Unauthorized User" });
      }
      const commentOnUserPostRes = await userDetail.updateOne(
        { id: toId },
        {
          $push: {
            "posts.$[field].comments.by": {
              user: req.rootUser.id,
              comment,
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
        return res
          .status(500)
          .json(<ResponseObject>{ success: false, msg: "Server Error" });
      }
      return res
        .status(200)
        .json(<ResponseObject>{ success: true, msg: "Commented Successfully" });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, Please try again Letter...",
      });
    }
  },
  getComment: async (req: Request, res: Response) => {
    try {
      const { postID, userID } = req.body;
      if (!postID || !userID) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Haven't got postID & userID",
        });
      }
      const commentRes = await userDetail.findOne(
        {
          userID: userID,
        },
        {
          _id: 0,
          posts: {
            $elemMatch: {
              id: postID,
            },
          },
        }
      );
      if (!commentRes) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Can't be able to complete action",
        });
      }
      if (commentRes?.posts[0].id !== postID) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Some problem occur, please report this issues on github repo",
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        comment: commentRes?.posts[0].comments,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!!, please try again later",
      });
    }
  },
  getUserPosts: async (req: Request, res: Response) => {
    try {
      const rootUser = req.rootUser;
      const resRootUser = await userDetail.findOne(
        // finding those user which i follow and get the posts of them
        // and finding post which is {getPastDate} days early
        {
          id: rootUser.id,
          // posts: {
          //   $elemMatch: {
          //     date: { $gt: dateGivenDaysAgo },
          //   },
          // },
        },
        {
          posts: { $slice: -20 },
        }
      );

      if (!resRootUser) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      let commentedUserId: string[] = [];
      const posts: object = resRootUser.posts;
      // let userIdFromSameUserPostsComment: string[] = [];
      for (let i = 0; i < resRootUser.posts.length; i++) {
        const comment: { user: string } | undefined =
          posts[i].comments.by[posts[i].comments.by.length - 1];
        if (comment) {
          commentedUserId.push(comment.user);
        }
      }

      const resAllCommentedUser = await userDetail.find(
        { id: { $in: commentedUserId } },
        {
          _id: 0,
          userID: 1,
          picture: 1,
          id: 1,
        }
      );

      const mergeArrays = (arr1, arr2) => {
        return arr1.map((obj) => {
          const lastCommented = obj.comments.by[obj.comments.by.length - 1];
          if (lastCommented) {
            const numbers = arr2.filter(
              (nums) => nums.id === lastCommented.user
            );
            if (!numbers.length) {
              // obj.phone = numbers;
              return obj;
            }
            const newUser = numbers.map((num) => ({
              picture: num.picture,
              userID: num.userID,
            }));
            const newObj: ResPonseUserPost = {
              // ...obj,
              picture: {
                url: obj.picture.url,
              },
              caption: obj.caption,
              date: obj.date,
              id: obj.id,
              likes: obj.likes,
              comments: {
                No: obj.comments.No,
                by: [
                  {
                    user: lastCommented.user,
                    comment: lastCommented.comment,
                    picture: newUser[0].picture,
                    userID: newUser[0].userID,
                  },
                ],
              },
            };
            return newObj;
          }
          return obj;
        });
      };

      const userPosts = mergeArrays(resRootUser.posts, resAllCommentedUser);
      return res.status(200).send(<ResponseObject>{
        success: true,
        msg: "Successful",
        posts: userPosts,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!!, please try again later",
      });
    }
  },
};
