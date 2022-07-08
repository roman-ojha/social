import UserDetail from "../models/userDetail_model.js";

const followUser = async (
  rootUserID: string,
  followedToUserID: string
): Promise<boolean> => {
  try {
    // saving following user detail into current user database
    const addOnRootUser = await UserDetail.updateOne(
      {
        id: rootUserID,
      },
      {
        // pushing the new followers into followed to user database
        $push: {
          following: {
            id: followedToUserID,
          },
        },
        $inc: {
          followingNo: 1,
        },
      }
    );

    // saving following user detail into followed to user database
    const followRes = await UserDetail.updateOne(
      {
        id: followedToUserID,
      },
      {
        // pushing the new followers into followed to user database
        $push: {
          followers: {
            id: rootUserID,
          },
          notification: {
            topic: "follow",
            user: rootUserID,
          },
        },
        $inc: {
          followersNo: 1,
        },
      }
    );
    if (followRes && addOnRootUser) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default followUser;
