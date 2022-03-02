import userDetail from "../models/userDetail_model.js";
import bcrypt from "bcryptjs";
export default async function createNewMessage(sender, reciver) {
  try {
    const rootUser = sender;
    const receiverUser = reciver;
    if (!receiverUser.userID) {
      return { success: false, msg: "receiver Doesn't exist" };
    }
    const receiverExist = await userDetail.findOne({
      // searching that user to message if it exist
      userID: receiverUser.userID,
    });
    if (!receiverExist) {
      return { success: false, msg: "User doesn't exist" };
    }
    // when #13 (Github) issues will solve then we will create room id from both user id
    const roomID = await bcrypt.hash(`${rootUser.userID}&${receiverUser}`, 12);
    console.log(roomID);
    const resSaveRootMsg = await userDetail.updateOne(
      // creating and saving message to rootUser
      {
        userID: sender,
      },
      {
        $push: {
          messages: {
            messageTo: receiverUser,
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
        userID: receiverUser,
      },
      {
        $push: {
          messages: {
            messageTo: rootUser,
            receiverPicture: rootUser.picture,
            rootID: roomID,
            message: [],
          },
        },
      }
    );
    if (resSaverReciverMsg && resSaveRootMsg) {
      return { success: true, msg: "message created" };
    } else {
      return { success: false, msg: "server error" };
    }
  } catch (err) {}
}
