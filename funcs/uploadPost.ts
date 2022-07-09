import UserDocument, { UserDocumentPosts } from "../interface/userDocument.js";
import { UserDocumentStories } from "../interface/userDocument.js";
import { UpdateResult } from "mongodb";
import UserDetail from "../models/userDetail_model.js";

const uploadPost = async (
  postData: object,
  userStoryDetail: UserDocumentStories | undefined,
  id: UserDocument["id"]
): Promise<boolean> => {
  try {
    let resPost: UpdateResult;
    if (userStoryDetail !== undefined) {
      resPost = await UserDetail.updateOne(
        {
          id: id,
        },
        {
          $push: {
            // posts: postData,
            posts: { $each: [postData as UserDocumentPosts], $position: 0 },
          },
          $inc: {
            postNo: 1,
          },

          $set: {
            stories: userStoryDetail,
          },
        }
      );
    } else {
      resPost = await UserDetail.updateOne(
        {
          id: id,
        },
        {
          $push: {
            posts: { $each: [postData as UserDocumentPosts], $position: 0 },
          },
          $inc: {
            postNo: 1,
          },
        }
      );
    }
    if (resPost) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default uploadPost;
