import userDetail from "../models/userDetail_model.js";
import fs from "fs";
import { Request, Response } from "express";
import ResponseObject from "../interface/responseObject.js";

var botUser = [];
fs.readFile("./db/botUser.json", "utf-8", (err, user) => {
  botUser = JSON.parse(user);
});

export default {
  main: async (req: Request, res: Response): Promise<object> => {
    // writing logic to get all rootUser and rootUser follow user post
    // console.log(req.rootUser.friends);
    try {
      let getUserPost: never[];
      const currentDate = new Date();
      const getUserPostFunction = async (
        getPastDate: number
      ): Promise<never[]> => {
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
                id: req.rootUser.id,
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
            // "posts.comments.by": { $slice: -1 },
            userID: 1,
            name: 1,
            picture: 1,
            email: 1,
            id: 1,
          }
        );

        //

        console.log(getUserPost[0]);
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
      let userSuggestion: any[] = await userDetail.aggregate([
        //getting the document that is not rootUser & and the user which is not friend of rootUser
        {
          $match: {
            $and: [
              { "friends.id": { $not: { $eq: req.rootUser.id } } },
              { "followers.id": { $not: { $eq: req.rootUser.id } } },
              { id: { $not: { $eq: req.rootUser.id } } },
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
            id: 1,
          },
        },
        { $sample: { size: 5 } },
      ]);
      const lengthOfuserSuggestion: number = userSuggestion.length;
      for (let i = 0; i < 5 - lengthOfuserSuggestion; i++) {
        // pushing but user according to the user that are avilable in original userSuggestion data
        userSuggestion.push(botUser[i]);
      }
      // getting/create data for Followed by user block in client site
      let followedBy: any[] = await userDetail.aggregate([
        {
          $match: {
            $and: [
              { "friends.id": { $not: { $eq: req.rootUser.id } } },
              { "following.id": req.rootUser.id },
            ],
          },
        },
        {
          // getting only required field
          $project: {
            email: 1,
            picture: 1,
            name: 1,
            userID: 1,
            id: 1,
          },
        },
        { $sample: { size: 5 } },
      ]);
      const lengthOfFollowedBy: number = followedBy.length;
      for (let i = botUser.length - 1; i >= lengthOfFollowedBy; i--) {
        followedBy.push(botUser[i]);
      }

      let userStories: any[] = await userDetail.aggregate([
        {
          $match: {
            $and: [
              { "followers.id": req.rootUser.id },
              { stories: { $not: { $eq: null } } },
            ],
          },
        },
        {
          $project: {
            picture: 1,
            userID: 1,
            name: 1,
            stories: 1,
          },
        },
        {
          $sample: { size: 10 },
        },
      ]);
      const lengthOfUserStories: number = userStories.length;
      for (let i = botUser.length - 1; i >= lengthOfUserStories; i--) {
        userStories.push(botUser[i]);
      }
      const resData: any = {
        userProfileDetail: req.rootUser,
        followedUserPost: getUserPost,
        userSuggestion,
        followedBy,
        userStories,
      };
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Welcome to Social",
        data: resData,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, Please Try again letter",
      });
    }
  },
  homeUser: (req: Request, res: Response): object => {
    try {
      const rootUser = req.rootUser;
      return res.status(200).json(rootUser);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server Error!!, Please Try again letter",
      });
    }
  },
  getUserProfile: async (req: Request, res: Response): Promise<object> => {
    try {
      const rootUser = req.rootUser;
      const userID = req.params.userid;
      const searchedUser = await userDetail.findOne(
        { userID: userID },
        {
          posts: { $slice: -5 },
          password: 0,
          cpassword: 0,
          birthday: 0,
          gender: 0,
          date: 0,
          messages: 0,
          tokens: 0,
          email: 0,
          notification: 0,
          followers: 0,
          following: 0,
          friends: 0,
        }
      );

      if (!searchedUser) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      } else {
        const isRootUserFollowed = await userDetail.findOne(
          {
            id: rootUser.id,
            following: {
              $elemMatch: {
                id: searchedUser.id,
              },
            },
          },
          {
            id: 1,
            _id: 0,
            userID: 1,
          }
        );
        if (!isRootUserFollowed) {
          return res.status(200).json(<ResponseObject>{
            success: true,
            msg: "Found User",
            searchedUser,
            isRootUserFollowed: false,
          });
        } else {
          return res.status(200).json(<ResponseObject>{
            success: true,
            msg: "Found User",
            searchedUser,
            isRootUserFollowed: true,
          });
        }
      }
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
  search: async (req: Request, res: Response): Promise<object> => {
    try {
      if (req.body.userID.length === 0) {
        return res.status(201).json([]);
      }
      const resUser = await userDetail
        .find(
          {
            userID: { $regex: "^" + req.body.userID, $options: "i" },
          },
          { name: 1, picture: 1, userID: 1, email: 1, _id: 0 }
        )
        .limit(10);
      return res.status(201).json(resUser);
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
  followUser: async (req: Request, res: Response): Promise<object> => {
    try {
      const rootUser = req.rootUser;
      const { userID, id } = req.body;
      // these are the followed to user id and email
      if (!userID || !id) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "UnAuthorized" });
      }
      const followUserExist = await userDetail.findOne(
        {
          // here we are finding only the user which is followed by rootuser to user who is being followed
          // if it doesn't exist only after that we will going to go forther to save the data if it exist it means he had already follwed the user
          id: rootUser.id,
          following: {
            $elemMatch: {
              id: id,
            },
          },
        },
        {
          name: 1,
          picture: 1,
          email: 1,
          id: 1,
        }
      );
      if (followUserExist) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "you had already followed this user",
        });
      }
      const followedToUser = await userDetail.findOne(
        {
          id: id,
        },
        {
          email: 1,
          name: 1,
          userID: 1,
          picture: 1,
          id: 1,
        }
      );
      if (!followedToUser) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      const followRes = await rootUser.followUser({ id: followedToUser.id });
      if (!followRes) {
        return res
          .status(500)
          .json(<ResponseObject>{ success: false, msg: "Server error" });
      }
      // logic to store as a friend if both of them had followed
      // we had already check for rootUser that that does rootUser followed the other user
      // now we just have to check does other user follow rootUser if then then save it as a friend
      const rootUserExistInFollowUser = await userDetail.findOne(
        {
          id: id,
          following: {
            $elemMatch: {
              id: rootUser.id,
            },
          },
        },
        {
          name: 1,
          picture: 1,
          userID: 1,
          email: 1,
          id: 1,
        }
      );
      if (rootUserExistInFollowUser) {
        // if root userExist in followed user only at that time we are porforming this task
        const followUserExistInRootUser = await userDetail.findOne(
          {
            id: rootUser.id,
            following: {
              $elemMatch: {
                id: id,
              },
            },
          },
          {
            name: 1,
            picture: 1,
            userID: 1,
            email: 1,
            id: 1,
          }
        );
        if (followUserExistInRootUser) {
          // if both of them follow then this will run
          // storing as a friend to rootuser
          await userDetail.updateOne(
            {
              id: rootUser.id,
            },
            {
              // pushing the new followers into followed to user database
              $push: {
                friends: {
                  // name: followedToUser.name,
                  // email: followedToUser.email,
                  // userID: followedToUser.userID,
                  // picture: followedToUser.picture,
                  id: followedToUser.id,
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
              id: followedToUser.id,
            },
            {
              // pushing the new followers into followed to user database
              $push: {
                friends: {
                  // name: rootUser.name,
                  // email: rootUser.email,
                  // userID: rootUser.userID,
                  // picture: rootUser.picture,
                  id: rootUser.id,
                },
              },
              $inc: {
                friendsNo: 1,
              },
            }
          );
        }
      }
      return res
        .status(200)
        .json(<ResponseObject>{ success: true, msg: "Follow successfully" });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
  unFollowUser: async (req: Request, res: Response): Promise<object> => {
    try {
      const rootUser = req.rootUser;
      const { userID, id } = req.body;
      // NOTE userID = user that rootUser is trying to search or query
      if (!userID || !id) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "UnAuthorized" });
      }
      const unFollowUserExistOnRootUser = await userDetail.findOne(
        {
          id: rootUser.id,
          following: {
            $elemMatch: {
              id: id,
            },
          },
        },
        {
          name: 1,
          picture: 1,
          userID: 1,
          email: 1,
          id: 1,
        }
      );

      if (!unFollowUserExistOnRootUser) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "you hadn't followed this user yet",
        });
      }
      const unFollowedToUserExist = await userDetail.findOne(
        {
          id: id,
        },
        {
          email: 1,
          name: 1,
          userID: 1,
          picture: 1,
          id: 1,
        }
      );
      if (!unFollowedToUserExist) {
        return res
          .status(401)
          .json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      // const followRes = await rootUser.unFollowUser(unFollowedToUserExist);
      let unFollowRes = await userDetail.updateOne(
        {
          id: rootUser.id,
        },
        {
          $pull: { following: { id: id } },
          $inc: {
            followingNo: -1,
          },
        }
      );
      if (!unFollowRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please try again later",
        });
      }
      unFollowRes = await userDetail.updateOne(
        {
          id: id,
        },
        {
          $pull: {
            followers: { id: rootUser.id },
            notification: {
              user: rootUser.id,
            },
          },
          $inc: {
            followersNo: -1,
          },
        }
      );
      if (!unFollowRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please Try again later",
        });
      }
      const friendExist = await userDetail.findOne(
        {
          id: rootUser.id,
          friends: {
            $elemMatch: {
              id: id,
            },
          },
        },
        {
          name: 1,
          picture: 1,
          userID: 1,
          email: 1,
          id: 1,
        }
      );
      if (!friendExist) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "UnFollowed User Successfully",
        });
      }
      let unfriendRes = await userDetail.updateOne(
        {
          id: rootUser.id,
        },
        {
          $pull: { friends: { id: id } },
          $inc: {
            friendsNo: -1,
          },
        }
      );
      if (!unfriendRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please Try again later",
        });
      }
      unfriendRes = await userDetail.updateOne(
        {
          id: id,
        },
        {
          $pull: { friends: { id: rootUser.id } },
          $inc: {
            friendsNo: -1,
          },
        }
      );
      if (!unfriendRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please Try again later",
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "UnFollowed User Successfully",
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later",
      });
    }
  },
  getNotificationData: async (req: Request, res: Response) => {
    try {
      const userID = req.rootUser.userID;
      const getNotificationRes = await userDetail.findOne(
        {
          userID: userID,
        },
        {
          notification: { $slice: -10 },
          password: 0,
          cpassword: 0,
          email: 0,
          id: 0,
          name: 0,
          birthday: 0,
          stories: 0,
          followersNo: 0,
          followingNo: 0,
          followers: 0,
          followings: 0,
          following: 0,
          friendsNo: 0,
          friends: 0,
          postNo: 0,
          posts: 0,
          tokens: 0,
          gender: 0,
          date: 0,
          messages: 0,
          picture: 0,
          userID: 0,
          _id: 0,
        }
      );
      if (!getNotificationRes) {
        return res
          .status(404)
          .json(<ResponseObject>{ success: false, msg: "User not Found" });
      }
      const users = getNotificationRes.notification.map((el) => el.user);
      const resUser = await userDetail.find(
        { id: { $in: users } },
        {
          _id: 0,
          userID: 1,
          picture: 1,
        }
      );
      // At least for right now i will not again add topic field in notification
      if (!resUser) {
        res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Some problem occur please try again later...",
        });
      }
      res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        data: resUser,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Server Error!!, Please Try again later" });
    }
  },
  getFriends: async (req: Request, res: Response): Promise<object> => {
    try {
      const id = req.params.id;
      const resFriends: any[] = await userDetail.find(
        {
          friends: {
            $elemMatch: {
              id: id,
            },
          },
        },
        {
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
          id: 1,
        }
      );
      if (!resFriends) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Error Occur while fetching friends data",
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        friends: resFriends,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, while fetching friends data",
      });
    }
  },
  getFollowers: async (req: Request, res: Response): Promise<object> => {
    try {
      const id = req.params.id;
      const resFriends: any[] = await userDetail.find(
        {
          following: {
            $elemMatch: {
              id: id,
            },
          },
        },
        {
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
          id: 1,
        }
      );
      if (!resFriends) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Error Occur while fetching friends data",
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        friends: resFriends,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, while fetching friends data",
      });
    }
  },
  getFollowings: async (req: Request, res: Response): Promise<object> => {
    try {
      const id = req.params.id;
      const resFriends: any[] = await userDetail.find(
        {
          followers: {
            $elemMatch: {
              id: id,
            },
          },
        },
        {
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
          id: 1,
        }
      );
      if (!resFriends) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Error Occur while fetching friends data",
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        friends: resFriends,
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, while fetching friends data",
      });
    }
  },
};
