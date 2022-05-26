import UserDetail from "../models/userDetail_model.js";
import adminConstant from "../constants/admin.js";
import { UserDocumentBirthday } from "interface/userDocument.js";
import ResponseObject from "../interface/responseObject.js";
import crypto from "crypto";
const adminFailMsg = "Admin SignIn Failed";

const checkAdminExistInDatabase = async () => {
  try {
    const isAdminExist = await UserDetail.findOne(
      { userID: adminConstant.adminUserID },
      { userID: 1, name: 1, id: 1, email: 1 }
    );
    if (!isAdminExist) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(adminFailMsg);
    return false;
  }
};

const signInAdmin = async () => {
  try {
  } catch (err) {
    console.log(adminFailMsg);
  }
};

interface AdminRegistrationArgument {
  name: string;
  userID: string;
  email: string;
  password: string;
  cpassword: string;
  gender: string;
  birthday: UserDocumentBirthday;
}

const registerAdmin = async (admin: AdminRegistrationArgument) => {
  try {
    if (
      !admin.name ||
      !admin.email ||
      !admin.password ||
      !admin.cpassword ||
      !admin.birthday ||
      !admin.gender ||
      !admin.userID
    ) {
      return <ResponseObject>{
        success: false,
        msg: "Not being able to get all required field!!!",
      };
    }
    if (admin.password !== admin.cpassword) {
      return <ResponseObject>{
        success: false,
        msg: "Password doesn't match",
      };
    }
    const emailExist = await UserDetail.findOne(
      { email: admin.email },
      { name: 1, userID: 1, email: 1 }
    );
    if (emailExist) {
      return <ResponseObject>{ success: false, msg: "Email already Exist" };
    }
    const id = crypto.randomBytes(16).toString("hex");
    const creatingNewUserData = new UserDetail({
      id,
      userID: admin.userID,
      name: admin.name,
      email: admin.email,
      password: admin.password,
      cpassword: admin.cpassword,
      birthday: admin.birthday,
      gender: admin.gender,
      followersNo: 0,
      followingNo: 0,
      postNo: 0,
      friendsNo: 0,
      storiesNo: 0,
    });
    const saveUserRes = await creatingNewUserData.save();
    if (!saveUserRes) {
      return <ResponseObject>{
        success: false,
        msg: "Server Error!,Failed registerd!!!",
      };
    }
    return <ResponseObject>{
      success: true,
      msg: "Admin register successfully",
    };
  } catch (err) {
    console.log(adminFailMsg);
  }
};

const AuthAdmin = async () => {
  try {
    const isAdminExist = await checkAdminExistInDatabase();
    if (!isAdminExist) {
      const name = adminConstant.adminName;
      const email = process.env.ADMIN_LOGIN_EMAIL;
      const userID = adminConstant.adminUserID;
      const password = process.env.ADMIN_LOGIN_PASSWORD;
      const cpassword = process.env.ADMIN_LOGIN_PASSWORD;
      const gender = adminConstant.adminGender;
      const birthday = adminConstant.adminBirthday;
      // await registerAdmin({});
    }
  } catch (err) {
    console.log(adminFailMsg);
  }
};

export default AuthAdmin;
