/* eslint-disable import/no-unresolved */
import { Request, Response } from "express";
import fs from "fs";
import userDetail from "../models/userDetail_model.js";
import ResponseObject from "../interface/responseObject.js";
import ResPonseUserPost from "../interface/resUserPost.js";
import { UserDocumentPosts } from "../interface/userDocument.js";
import SchemaMethodInstance from "../interface/userSchemaMethods.js";

let botUser = [];
fs.readFile("./db/botUser.json", "utf-8", (err, user) => {
  botUser = JSON.parse(user);
});

function mergeRootUserData(
  userPosts: UserDocumentPosts[],
  commentedUser: (SchemaMethodInstance & {
    _id: any;
  })[]
) {
  return userPosts.map((post) => {
    const lastCommented = post.comments.by[post.comments.by.length - 1];
    if (lastCommented) {
      const filteredUser = commentedUser.filter((user) => user.id === lastCommented.user);
      if (!filteredUser.length) {
        // post.phone = filteredUser;
        return post;
      }
      const newUser = filteredUser.map((user) => ({
        picture: user.picture,
        userID: user.userID
      }));
      const newObj: ResPonseUserPost = {
        // ...post,
        picture: {
          url: post.picture.url
        },
        caption: post.caption,
        date: post.date,
        id: post.id,
        likes: post.likes,
        comments: {
          No: post.comments.No,
          by: [
            {
              user: lastCommented.user,
              comment: lastCommented.comment,
              picture: newUser[0].picture,
              userID: newUser[0].userID
            }
          ]
        }
      };
      return newObj;
    }
    return post;
  });
}

function mergeRootUserProfile(
  userPosts: UserDocumentPosts[],
  commentedUser: (SchemaMethodInstance & {
    _id: any;
  })[]
) {
  return userPosts.map((post) => {
    const lastCommented = post.comments.by[post.comments.by.length - 1];
    if (lastCommented) {
      const filteredUser = commentedUser.filter((user) => user.id === lastCommented.user);
      if (!filteredUser.length) {
        // post.phone = filteredUser;
        return post;
      }
      const newUser = filteredUser.map((user) => ({
        picture: user.picture,
        userID: user.userID
      }));
      const newObj: ResPonseUserPost = {
        // ...post,
        picture: {
          url: post.picture.url
        },
        caption: post.caption,
        date: post.date,
        id: post.id,
        likes: post.likes,
        comments: {
          No: post.comments.No,
          by: [
            {
              user: lastCommented.user,
              comment: lastCommented.comment,
              picture: newUser[0].picture,
              userID: newUser[0].userID
            }
          ]
        }
      };
      return newObj;
    }
    return post;
  });
}

export default {
  main: async (req: Request, res: Response): Promise<object> => {
    // writing logic to get all rootUser and rootUser follow user post
    try {
      const { rootUser } = req;
      const currentDate = new Date();

      const getRootUserData = async () => {
        type RootUserResponseData = {
          posts: [] | {};
          userID: string | number;
          name: string | number;
          picture: string | number;
          email: string | number;
          id: string | number;
          stories: {} | number;
          followersNo: number;
          followingNo: number;
          postNo: number;
        };

        // const dateGivenDaysAgo = new Date(currentDate);
        // dateGivenDaysAgo.setHours(dateGivenDaysAgo.getHours() - 1);

        const resRootUser = await userDetail.findOne(
          // finding those user which i follow and get the posts of them
          // and finding post which is {getPastDate} days early
          {
            id: rootUser.id
            // posts: {
            //   $elemMatch: {
            //     date: { $gt: dateGivenDaysAgo },
            //   },
            // },
          },
          <RootUserResponseData>{
            posts: { $slice: -3 },
            userID: 1,
            name: 1,
            picture: 1,
            email: 1,
            id: 1,
            stories: 1,
            followersNo: 1,
            followingNo: 1,
            postNo: 1
          }
        );

        if (!resRootUser) {
          return;
        }
        const commentedUserId: string[] = [];
        const { posts } = resRootUser;
        // let userIdFromSameUserPostsComment: string[] = [];
        for (let i = 0; i < resRootUser.posts.length; i += 1) {
          const comment: { user: string } | undefined = posts[i].comments.by[posts[i].comments.by.length - 1];
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
            id: 1
          }
        );
        const finalRootUserData: RootUserResponseData = {
          userID: resRootUser.userID,
          name: resRootUser.name,
          picture: resRootUser.picture,
          email: resRootUser.email,
          id: resRootUser.id,
          stories: resRootUser.stories,
          posts: mergeRootUserData(resRootUser.posts, resAllCommentedUser),
          followersNo: resRootUser.followersNo,
          followingNo: resRootUser.followingNo,
          postNo: resRootUser.postNo
        };
        // eslint-disable-next-line consistent-return
        return finalRootUserData;
      };
      const rootUserData = await getRootUserData();

      const getRootUserFollowingUserPostData = async (getPastDate: number) => {
        // getPastDate will get those date from which we want to user post filed
        const dateCurrentDateEarly = new Date(currentDate);
        dateCurrentDateEarly.setDate(dateCurrentDateEarly.getDate() - getPastDate);
        // resRootUserFollowingUserPostData = await userDetail
        //   .find(
        //     // finding those user which i follow and get the posts of them
        //     // and finding post which is {getPastDate} days early
        //     {
        //       followers: {
        //         $elemMatch: {
        //           id: req.rootUser.id,
        //         },
        //       },
        //       posts: {
        //         $elemMatch: {
        //           date: { $gt: dateCurrentDateEarly },
        //         },
        //       },
        //     },
        //     {
        //       posts: { $slice: [0, 5] },
        //       // "posts.comments.by": { $slice: -1 },
        //       userID: 1,
        //       name: 1,
        //       picture: 1,
        //       email: 1,
        //       id: 1,
        //     }
        //   )
        //   .limit(limitUser)
        //   .skip(skip);
        //
        const resRootUserFollowingUserPostData = await userDetail.aggregate([
          // getting the document that is not rootUser & and the user which is not friend of rootUser
          {
            $match: {
              "followers.id": rootUser.id
            }
          },
          {
            // getting only required field
            $project: {
              posts: { $slice: ["$posts", -5, 5] },
              // [<>,<last_5_posts>,<total_5_posts>]
              picture: 1,
              name: 1,
              userID: 1,
              email: 1,
              id: 1
            }
          },
          { $sample: { size: 10 } }
        ]);

        // Getting Dynamic Data of the user who comment on the user post
        const commentedUserId: string[] = [];
        for (let i = 0; i < resRootUserFollowingUserPostData.length; i += 1) {
          const { posts } = resRootUserFollowingUserPostData[i];
          // let userIdFromSameUserPostsComment: string[] = [];
          for (let j = 0; j < resRootUserFollowingUserPostData[i].posts.length; j += 1) {
            const comment: { user: string } | undefined = posts[j].comments.by[posts[j].comments.by.length - 1];
            if (comment) {
              commentedUserId.push(comment.user);
            }
            // userID[resRootUserFollowingUserPostData[i].id] = userIdFromSameUserPostsComment;
          }
        }

        const resAllCommentedUser = await userDetail.find(
          { id: { $in: commentedUserId } },
          {
            _id: 0,
            userID: 1,
            picture: 1,
            id: 1
          }
        );
        const finalPostData: object[] = [];
        function mergeRootUserFollowingUserPost(
          userPosts: any[],
          commentedUser: (SchemaMethodInstance & {
            _id: any;
          })[]
        ) {
          return userPosts.map((post) => {
            const lastCommented = post.comments.by[post.comments.by.length - 1];
            if (lastCommented) {
              const filteredUser = commentedUser.filter((user) => user.id === lastCommented.user);
              if (!filteredUser.length) {
                // post.phone = filteredUser;
                return post;
              }
              const newUser = filteredUser.map((user) => ({
                picture: user.picture,
                userID: user.userID
              }));
              const newObj = {
                ...post,
                comments: {
                  No: post.comments.No,
                  by: [
                    {
                      user: lastCommented.user,
                      comment: lastCommented.comment,
                      picture: newUser[0].picture,
                      userID: newUser[0].userID
                    }
                  ]
                }
              };
              return newObj;
            }
            return post;
          });
        }

        for (let i = 0; i < resRootUserFollowingUserPostData.length; i += 1) {
          finalPostData.push({
            posts: mergeRootUserFollowingUserPost(resRootUserFollowingUserPostData[i].posts, resAllCommentedUser),
            // [<>,<last_5_posts>,<total_5_posts>]
            picture: resRootUserFollowingUserPostData[i].picture,
            name: resRootUserFollowingUserPostData[i].name,
            userID: resRootUserFollowingUserPostData[i].userID,
            email: resRootUserFollowingUserPostData[i].email,
            id: resRootUserFollowingUserPostData[i].id
          });
        }
        // ========================================================

        return finalPostData;
      };
      const rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(5);
      // if (rootUserFollowingUserPostData.length === 0) {
      //   // if there is not any post which is fivedays early
      //   rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(30);
      //   if (rootUserFollowingUserPostData.length === 0) {
      //     // if there is not any post which is 30 days early
      //     rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(90);
      //     if (rootUserFollowingUserPostData.length === 0) {
      //       // if there is not any post which is 90 days early
      //       rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(180);
      //       if (rootUserFollowingUserPostData.length === 0) {
      //         // if there is not any post which is 180 days early
      //         rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(365);
      //         if (rootUserFollowingUserPostData.length === 0) {
      //           // if there is not any post which is 365 days early
      //           rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(1825);
      //         } else {
      //           // if there is not any post which is 5 year early
      //           rootUserFollowingUserPostData = await getRootUserFollowingUserPostData(36500);
      //           // then post which is 100 years early
      //         }
      //       }
      //     }
      //   }
      // }
      // getting/creating data for Suggestion for You and followed By block
      const userSuggestion: any[] = await userDetail.aggregate([
        // getting the document that is not rootUser & and the user which is not friend of rootUser
        {
          $match: {
            $and: [{ "friends.id": { $not: { $eq: req.rootUser.id } } }, { "followers.id": { $not: { $eq: req.rootUser.id } } }, { id: { $not: { $eq: req.rootUser.id } } }]
          }
        },
        {
          // getting only required field
          $project: {
            picture: 1,
            name: 1,
            userID: 1,
            email: 1,
            id: 1
          }
        },
        { $sample: { size: 5 } }
      ]);
      const lengthOfuserSuggestion: number = userSuggestion.length;
      for (let i = 0; i < 5 - lengthOfuserSuggestion; i += 1) {
        // pushing but user according to the user that are avilable in original userSuggestion data
        userSuggestion.push(botUser[i]);
      }
      // getting/create data for Followed by user block in client site
      const followedBy: any[] = await userDetail.aggregate([
        {
          $match: {
            $and: [{ "friends.id": { $not: { $eq: req.rootUser.id } } }, { "following.id": req.rootUser.id }]
          }
        },
        {
          // getting only required field
          $project: {
            email: 1,
            picture: 1,
            name: 1,
            userID: 1,
            id: 1
          }
        },
        { $sample: { size: 5 } }
      ]);
      const lengthOfFollowedBy: number = followedBy.length;
      for (let i = botUser.length - 1; i >= lengthOfFollowedBy; i -= 1) {
        followedBy.push(botUser[i]);
      }

      const userStories: any[] = await userDetail.aggregate([
        {
          $match: {
            $and: [{ "followers.id": req.rootUser.id }, { stories: { $not: { $eq: null } } }]
          }
        },
        {
          $project: {
            picture: 1,
            userID: 1,
            name: 1,
            stories: 1
          }
        },
        {
          $sample: { size: 10 }
        }
      ]);
      const lengthOfUserStories: number = userStories.length;
      for (let i = botUser.length - 1; i >= lengthOfUserStories; i -= 1) {
        userStories.push(botUser[i]);
      }
      const resData: any = {
        userProfileDetail: rootUserData,
        followedUserPost: rootUserFollowingUserPostData,
        userSuggestion,
        followedBy,
        userStories
      };
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Welcome to Social",
        data: resData
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, Please Try again later"
      });
    }
  },
  homeUser: (req: Request, res: Response): object => {
    try {
      const { rootUser } = req;
      return res.status(200).json(rootUser);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Server Error!!, Please Try again later"
      });
    }
  },
  getUserProfile: async (req: Request, res: Response): Promise<object> => {
    try {
      const { rootUser } = req;
      const userID = req.params.userid;
      type SearchedUserResponseData = {
        posts: [] | {};
        userID: string | number;
        name: string | number;
        picture: string | number;
        email: string | number;
        id: string | number;
        stories: {} | number;
        followersNo: number;
        followingNo: number;
        postNo: number;
      };
      const searchedUser = await userDetail.findOne({ userID }, <SearchedUserResponseData>{
        postNo: 1,
        posts: { $slice: -20 },
        name: 1,
        userID: 1,
        picture: 1,
        email: 1,
        id: 1,
        stories: 1,
        followersNo: 1,
        followingNo: 1
      });

      if (!searchedUser) {
        return res.status(401).json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      const isRootUserFollowed = await userDetail.findOne(
        {
          id: rootUser.id,
          following: {
            $elemMatch: {
              id: searchedUser.id
            }
          }
        },
        {
          id: 1,
          _id: 0,
          userID: 1
        }
      );

      const commentedUserId: string[] = [];
      const { posts } = searchedUser;
      // let userIdFromSameUserPostsComment: string[] = [];
      for (let i = 0; i < searchedUser.posts.length; i += 1) {
        const comment: { user: string } | undefined = posts[i].comments.by[posts[i].comments.by.length - 1];
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
          id: 1
        }
      );

      const finalSearchedUserData: SearchedUserResponseData = {
        userID: searchedUser.userID,
        name: searchedUser.name,
        picture: searchedUser.picture,
        email: searchedUser.email,
        id: searchedUser.id,
        stories: searchedUser.stories,
        posts: mergeRootUserProfile(searchedUser.posts, resAllCommentedUser),
        followersNo: searchedUser.followersNo,
        followingNo: searchedUser.followingNo,
        postNo: searchedUser.postNo
      };
      if (!isRootUserFollowed) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "Found User",
          searchedUser: finalSearchedUserData,
          isRootUserFollowed: false
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Found User",
        searchedUser: finalSearchedUserData,
        isRootUserFollowed: true
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later"
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
            userID: { $regex: `^${req.body.userID}`, $options: "i" }
          },
          // eslint-disable-next-line object-curly-newline
          { name: 1, picture: 1, userID: 1, email: 1, _id: 0 }
        )
        .limit(10);
      return res.status(201).json(resUser);
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later"
      });
    }
  },
  followUser: async (req: Request, res: Response): Promise<object> => {
    try {
      const { rootUser } = req;
      const { userID, id } = req.body;
      // these are the followed to user id and email
      if (!userID || !id) {
        return res.status(401).json(<ResponseObject>{ success: false, msg: "UnAuthorized" });
      }
      const followUserExist = await userDetail.findOne(
        {
          // here we are finding only the user which is followed by rootuser to user who is being followed
          // if it doesn't exist only after that we will going to go forther to save the data if it exist it means he had already follwed the user
          id: rootUser.id,
          following: {
            $elemMatch: {
              id
            }
          }
        },
        {
          name: 1,
          picture: 1,
          email: 1,
          id: 1
        }
      );
      if (followUserExist) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "you had already followed this user"
        });
      }
      const followedToUser = await userDetail.findOne(
        {
          id
        },
        {
          email: 1,
          name: 1,
          userID: 1,
          picture: 1,
          id: 1
        }
      );
      if (!followedToUser) {
        return res.status(401).json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      const followRes = await rootUser.followUser({ id: followedToUser.id });
      if (!followRes) {
        return res.status(500).json(<ResponseObject>{ success: false, msg: "Server error" });
      }
      // logic to store as a friend if both of them had followed
      // we had already check for rootUser that that does rootUser followed the other user
      // now we just have to check does other user follow rootUser if then then save it as a friend
      const rootUserExistInFollowUser = await userDetail.findOne(
        {
          id,
          following: {
            $elemMatch: {
              id: rootUser.id
            }
          }
        },
        {
          name: 1,
          picture: 1,
          userID: 1,
          email: 1,
          id: 1
        }
      );
      if (rootUserExistInFollowUser) {
        // if root userExist in followed user only at that time we are porforming this task
        const followUserExistInRootUser = await userDetail.findOne(
          {
            id: rootUser.id,
            following: {
              $elemMatch: {
                id
              }
            }
          },
          {
            name: 1,
            picture: 1,
            userID: 1,
            email: 1,
            id: 1
          }
        );
        if (followUserExistInRootUser) {
          // if both of them follow then this will run
          // storing as a friend to rootuser
          await userDetail.updateOne(
            {
              id: rootUser.id
            },
            {
              // pushing the new followers into followed to user database
              $push: {
                friends: {
                  // name: followedToUser.name,
                  // email: followedToUser.email,
                  // userID: followedToUser.userID,
                  // picture: followedToUser.picture,
                  id: followedToUser.id
                }
              },
              $inc: {
                friendsNo: 1
              }
            }
          );
          // storing as a friend to followedToUser
          await userDetail.updateOne(
            {
              id: followedToUser.id
            },
            {
              // pushing the new followers into followed to user database
              $push: {
                friends: {
                  // name: rootUser.name,
                  // email: rootUser.email,
                  // userID: rootUser.userID,
                  // picture: rootUser.picture,
                  id: rootUser.id
                }
              },
              $inc: {
                friendsNo: 1
              }
            }
          );
        }
      }
      return res.status(200).json(<ResponseObject>{ success: true, msg: "Follow successfully" });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later"
      });
    }
  },
  unFollowUser: async (req: Request, res: Response): Promise<object> => {
    try {
      const { rootUser } = req;
      const { userID, id } = req.body;
      // NOTE userID = user that rootUser is trying to search or query
      if (!userID || !id) {
        return res.status(401).json(<ResponseObject>{ success: false, msg: "UnAuthorized" });
      }
      const unFollowUserExistOnRootUser = await userDetail.findOne(
        {
          id: rootUser.id,
          following: {
            $elemMatch: {
              id
            }
          }
        },
        {
          name: 1,
          picture: 1,
          userID: 1,
          email: 1,
          id: 1
        }
      );

      if (!unFollowUserExistOnRootUser) {
        return res.status(400).json(<ResponseObject>{
          success: false,
          msg: "you hadn't followed this user yet"
        });
      }
      const unFollowedToUserExist = await userDetail.findOne(
        {
          id
        },
        {
          email: 1,
          name: 1,
          userID: 1,
          picture: 1,
          id: 1
        }
      );
      if (!unFollowedToUserExist) {
        return res.status(401).json(<ResponseObject>{ success: false, msg: "User doesn't exist" });
      }
      // const followRes = await rootUser.unFollowUser(unFollowedToUserExist);
      let unFollowRes = await userDetail.updateOne(
        {
          id: rootUser.id
        },
        {
          $pull: { following: { id } },
          $inc: {
            followingNo: -1
          }
        }
      );
      if (!unFollowRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please try again later"
        });
      }
      unFollowRes = await userDetail.updateOne(
        {
          id
        },
        {
          $pull: {
            followers: { id: rootUser.id },
            notification: {
              user: rootUser.id
            }
          },
          $inc: {
            followersNo: -1
          }
        }
      );
      if (!unFollowRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please Try again later"
        });
      }
      const friendExist = await userDetail.findOne(
        {
          id: rootUser.id,
          friends: {
            $elemMatch: {
              id
            }
          }
        },
        {
          name: 1,
          picture: 1,
          userID: 1,
          email: 1,
          id: 1
        }
      );
      if (!friendExist) {
        return res.status(200).json(<ResponseObject>{
          success: true,
          msg: "UnFollowed User Successfully"
        });
      }
      let unfriendRes = await userDetail.updateOne(
        {
          id: rootUser.id
        },
        {
          $pull: { friends: { id } },
          $inc: {
            friendsNo: -1
          }
        }
      );
      if (!unfriendRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please Try again later"
        });
      }
      unfriendRes = await userDetail.updateOne(
        {
          id
        },
        {
          $pull: { friends: { id: rootUser.id } },
          $inc: {
            friendsNo: -1
          }
        }
      );
      if (!unfriendRes) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Server error!!, Please Try again later"
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "UnFollowed User Successfully"
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, Please Try again later"
      });
    }
  },
  getNotificationData: async (req: Request, res: Response) => {
    try {
      const { userID } = req.rootUser;
      const getNotificationRes = await userDetail.findOne(
        {
          userID
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
          _id: 0
        }
      );
      if (!getNotificationRes) {
        return res.status(404).json(<ResponseObject>{ success: false, msg: "User not Found" });
      }
      const users = getNotificationRes.notification.map((el) => el.user);
      const resUser = await userDetail.find(
        { id: { $in: users } },
        {
          _id: 0,
          userID: 1,
          picture: 1
        }
      );
      // At least for right now i will not again add topic field in notification
      if (!resUser) {
        res.status(400).json(<ResponseObject>{
          success: false,
          msg: "Some problem occur please try again later..."
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        data: resUser
      });
    } catch (err) {
      return res.status(500).json({ error: "Server Error!!, Please Try again later" });
    }
  },
  getFriends: async (req: Request, res: Response): Promise<object> => {
    try {
      const { id } = req.params;
      const resFriends: any[] = await userDetail.find(
        {
          friends: {
            $elemMatch: {
              id
            }
          }
        },
        {
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
          id: 1
        }
      );
      if (!resFriends) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Error Occur while fetching friends data"
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        friends: resFriends
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, while fetching friends data"
      });
    }
  },
  getFollowers: async (req: Request, res: Response): Promise<object> => {
    try {
      const { id } = req.params;
      const resFriends: any[] = await userDetail.find(
        {
          following: {
            $elemMatch: {
              id
            }
          }
        },
        {
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
          id: 1
        }
      );
      if (!resFriends) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Error Occur while fetching friends data"
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        friends: resFriends
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, while fetching friends data"
      });
    }
  },
  getFollowings: async (req: Request, res: Response): Promise<object> => {
    try {
      const { id } = req.params;
      const resFriends: any[] = await userDetail.find(
        {
          followers: {
            $elemMatch: {
              id
            }
          }
        },
        {
          userID: 1,
          name: 1,
          picture: 1,
          email: 1,
          id: 1
        }
      );
      if (!resFriends) {
        return res.status(500).json(<ResponseObject>{
          success: false,
          msg: "Error Occur while fetching friends data"
        });
      }
      return res.status(200).json(<ResponseObject>{
        success: true,
        msg: "Successful",
        friends: resFriends
      });
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error!!, while fetching friends data"
      });
    }
  }
};
