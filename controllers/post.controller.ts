import userDetail from "../models/userDetail_model.js";
import { Request, Response } from "express";
import ResponseObject from "../interface/responseObject.js";
import ResPonseUserPost from "../interface/resUserPost.js";
import SchemaMethodInstance from "../interface/userSchemaMethods.js";
import {
  UserDocumentPosts,
  UserDocumentPostsComments,
} from "../interface/userDocument.js";
import crypto from "crypto";
import uploadPost from "../funcs/uploadPost.js";

export default {
  postImageUrl: async (req: Request, res: Response) => {
    try {
      const rootUser = req.rootUser;
      const { imageUrl, caption } = req.body;
      if (!caption && !imageUrl) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Please fill the required field",
        });
      }
      if (!imageUrl) {
        // if user only fill content field
        const postID = crypto.randomBytes(16).toString("hex");
        const userPostDetail = {
          id: postID,
          caption: caption,
          likes: {
            No: 0,
            by: [],
          },
          comments: {
            No: 0,
            by: [],
          },
        };
        const postSuccessRes = await uploadPost(
          userPostDetail,
          undefined,
          rootUser.id
        );
        if (postSuccessRes) {
          const resData = {
            ...userPostDetail,
            picture: undefined,
          };
          return res.status(200).json(<ResponseObject>{
            success: true,
            msg: "Post upload successfully",
            data: resData,
          });
        }
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server Error!!, Please Try again later",
        });
      }
      const postID = crypto.randomBytes(16).toString("hex");
      const today = new Date();
      const userPostDetail = <UserDocumentPosts>{
        id: postID,
        caption: caption,
        picture: {
          url: imageUrl,
          name: "",
          path: "",
          firebaseStorageDownloadToken: "",
          bucket: "",
        },
        likes: {
          No: 0,
          by: [],
        },
        comments: {
          No: 0,
          by: [],
        },
      };
      const userStoryDetail = {
        caption: caption,
        picture: imageUrl,
        date: `${today.toLocaleString("default", {
          month: "long",
        })} ${today.getDate()}, ${today.getFullYear()}`,
      };
      const postSuccessRes = await uploadPost(
        userPostDetail,
        userStoryDetail,
        rootUser.id
      );
      if (postSuccessRes) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "Post upload successfully",
          data: userPostDetail,
        });
      }
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
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
            msg: "server Error, Please try again later!!!",
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
          msg: "server Error, Please try again later!!!",
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
        msg: "server Error, Please try again later!!!",
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
        msg: "Server Error, Please try again later...",
      });
    }
  },
  getComment: async (req: Request, res: Response) => {
    try {
      const { postID, userID, id } = req.body;
      if (!postID || !userID || !id) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Haven't got postID & userID & id of user",
        });
      }
      const postRes = await userDetail.findOne(
        {
          id: id,
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
      if (!postRes) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Can't be able to complete action",
        });
      }

      if (postRes.posts[0].id !== postID) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Some problem occur, please report this issues on github repo",
        });
      }
      const commentRes = postRes.posts[0].comments;

      let commentedUserId: string[] = [];
      for (let i = 0; i < commentRes.by.length; i++) {
        const userInfo = commentRes.by[i];
        if (userInfo) {
          commentedUserId.push(userInfo.user);
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

      const mergeArrays = (
        comments: UserDocumentPostsComments[],
        commentedUser: (SchemaMethodInstance & {
          _id: any;
        })[]
      ) => {
        return comments.map((comment) => {
          const filteredUser = commentedUser.filter(
            (nums) => nums.id === comment.user
          );
          if (!filteredUser.length) {
            return comment;
          }
          const userInfo = filteredUser.map((num) => ({
            picture: num.picture,
            userID: num.userID,
          }));
          const newCommentedUserObj = {
            id: comment.user,
            comment: comment.comment,
            picture: userInfo[0].picture,
            userID: userInfo[0].userID,
          };
          return newCommentedUserObj;
        });
      };

      const finalComments = {
        No: commentRes.No,
        by: mergeArrays(commentRes.by, resAllCommentedUser),
      };

      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        comment: finalComments,
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

      const mergeArrays = (
        userPosts: UserDocumentPosts[],
        commentedUser: (SchemaMethodInstance & {
          _id: any;
        })[]
      ) => {
        return userPosts.map((post: UserDocumentPosts) => {
          const lastCommented = post.comments.by[post.comments.by.length - 1];
          if (lastCommented) {
            const numbers = commentedUser.filter(
              (user) => user.id === lastCommented.user
            );
            if (!numbers.length) {
              // obj.phone = numbers;
              return post;
            }
            const newUser = numbers.map((num) => ({
              picture: num.picture,
              userID: num.userID,
            }));
            const newObj: ResPonseUserPost = {
              picture: {
                url: post.picture.url,
              },
              caption: post.caption,
              date: post.date,
              id: post.id,
              likes: post.likes as ResPonseUserPost["likes"],
              comments: {
                No: post.comments.No,
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
          return post;
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
