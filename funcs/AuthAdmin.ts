import UserDetail from "../models/userDetail_model.js";
import adminConstant from "../constants/admin.js";
import { UserDocumentBirthday } from "interface/userDocument.js";
import ResponseObject from "../interface/responseObject.js";
import crypto from "crypto";
const adminFailMsg = "Admin SignIn Failed";

const checkAdminExistInDatabase = async (email: string | undefined) => {
  try {
    const isAdminExist = await UserDetail.findOne(
      { email: email },
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

interface AdminSignInArgument {
  email: string | undefined;
  password: string | undefined;
  cpassword: string | undefined;
}

const signInAdmin = async (
  admin: AdminSignInArgument
): Promise<ResponseObject> => {
  try {
    console.log("process... Signing In Admin");
    return <ResponseObject>{
      success: true,
      msg: "Admin SignIn Successfully",
    };
  } catch (err) {
    return <ResponseObject>{
      success: false,
      msg: "Admin SignIn Failed",
    };
  }
};

interface AdminRegistrationArgument {
  name: string;
  userID: string;
  email: string | undefined;
  password: string | undefined;
  cpassword: string | undefined;
  gender: string;
  birthday: UserDocumentBirthday;
}

const registerAdmin = async (
  admin: AdminRegistrationArgument
): Promise<ResponseObject> => {
  try {
    console.log("Process... Registering Admin");
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
    // const id = crypto.randomBytes(16).toString("hex");
    // const creatingNewUserData = new UserDetail({
    //   id,
    //   userID: admin.userID,
    //   name: admin.name,
    //   email: admin.email,
    //   password: admin.password,
    //   cpassword: admin.cpassword,
    //   birthday: admin.birthday,
    //   gender: admin.gender,
    //   followersNo: 0,
    //   followingNo: 0,
    //   postNo: 0,
    //   friendsNo: 0,
    //   storiesNo: 0,
    // });
    // const saveUserRes = await creatingNewUserData.save();
    // if (!saveUserRes) {
    //   return <ResponseObject>{
    //     success: false,
    //     msg: "Server Error!,Failed registerd!!!",
    //   };
    // }
    return <ResponseObject>{
      success: true,
      msg: "Admin register successfully",
    };
  } catch (err) {
    return <ResponseObject>{
      success: false,
      msg: "Admin registration failed",
    };
  }
};

const AuthAdmin = async () => {
  try {
    const name = adminConstant.adminName;
    const email = process.env.ADMIN_LOGIN_EMAIL;
    const userID = adminConstant.adminUserID;
    const password = process.env.ADMIN_LOGIN_PASSWORD;
    const cpassword = process.env.ADMIN_LOGIN_PASSWORD;
    const gender = adminConstant.adminGender;
    const birthday = adminConstant.adminBirthday;
    const isAdminExist = await checkAdminExistInDatabase(email);
    if (!isAdminExist) {
      const resRegistration: ResponseObject = await registerAdmin({
        name,
        email,
        userID,
        password,
        cpassword,
        gender,
        birthday,
      });
      if (!resRegistration.success) {
        console.log(resRegistration.msg);
      }
      console.log(resRegistration.msg);
      const resSignIn = await signInAdmin({ email, password, cpassword });
      if (!resSignIn.success) {
        console.log(resSignIn.msg);
      }
      console.log(resSignIn.msg);
      return;
    }
    const resSignIn = await signInAdmin({ email, password, cpassword });
    if (!resSignIn.success) {
      console.log(resSignIn.msg);
    }
    console.log(resSignIn.msg);
  } catch (err) {
    console.log(adminFailMsg);
  }
};

export default AuthAdmin;
