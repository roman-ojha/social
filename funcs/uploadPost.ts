import UserDocument, { UserDocumentPosts } from "../interface/userDocument";
import { UserDocumentStories } from "../interface/userDocument";
import { UpdateResult } from "mongodb";
import UserDetail from "../models/userDetail_model";

const uploadPost = async (
  postData: UserDocumentPosts,
  userStoryDetail: UserDocumentStories,
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
            posts: { $each: [postData], $position: 0 },
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
            posts: postData,
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
