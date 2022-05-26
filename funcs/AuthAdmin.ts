import UserDetail from "../models/userDetail_model.js";
import adminConstant from "../constants/admin.js";
import { UserDocumentBirthday } from "interface/userDocument.js";
import ResponseObject from "../interface/responseObject.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import SchemaMethodInstance from "../interface/userSchemaMethods.js";

const checkUserIDExistInDatabase = async (userID: string | undefined) => {
  try {
    const isAdminExist = await UserDetail.findOne(
      { userID: userID },
      { userID: 1, name: 1, id: 1, email: 1 }
    );
    if (!isAdminExist) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

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
    return false;
  }
};

interface AdminSignInArgument {
  email: string | undefined;
  password: string | undefined;
  cpassword: string | undefined;
}

interface ResponseObjectWithAdmin extends ResponseObject {
  admin:
    | (SchemaMethodInstance & {
        _id: any;
      })
    | null;
}

const signInAdmin = async (
  admin: AdminSignInArgument
): Promise<ResponseObjectWithAdmin> => {
  try {
    if (!admin.email || !admin.password) {
      return <ResponseObjectWithAdmin>{
        success: false,
        msg: "Email and Password is not provided!!!",
        admin: null,
      };
    }
    const adminExist = await UserDetail.findOne(
      { email: admin.email },
      {
        email: 1,
        password: 1,
        userID: 1,
        name: 1,
        id: 1,
      }
    );
    if (!adminExist) {
      return <ResponseObjectWithAdmin>{
        success: false,
        msg: "Error Login! Admin does't exist",
        admin: null,
      };
    }
    const isPasswordMatch = await bcrypt.compare(
      admin.password,
      adminExist.password
    );
    if (!isPasswordMatch) {
      return <ResponseObjectWithAdmin>{
        success: false,
        msg: "Email and password doesn't match",
        admin: null,
      };
    }
    return <ResponseObjectWithAdmin>{
      success: true,
      msg: "Admin SignIn Successfully",
      admin: adminExist,
    };
  } catch (err) {
    return <ResponseObjectWithAdmin>{
      success: false,
      msg: "Admin SignIn Failed",
      admin: null,
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
    const isUserIDExist = await UserDetail.findOne(
      { userID: admin.userID },
      { name: 1, userID: 1, email: 1 }
    );
    if (isUserIDExist) {
      return <ResponseObject>{ success: false, msg: "UserID already Exist" };
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
    return <ResponseObject>{
      success: false,
      msg: "Admin registration failed",
    };
  }
};

const AuthAdmin = async () => {
  try {
    const name = adminConstant.adminName;
    const userID = adminConstant.adminUserID;
    const email = process.env.ADMIN_LOGIN_EMAIL;
    const password = process.env.ADMIN_LOGIN_PASSWORD;
    const cpassword = process.env.ADMIN_LOGIN_PASSWORD;
    const gender = adminConstant.adminGender;
    const birthday = adminConstant.adminBirthday;
    // const isAdminExist = await checkAdminExistInDatabase(email);
    // SignIn Admin first:
    const resSignIn = await signInAdmin({ email, password, cpassword });
    if (!resSignIn.success) {
      // if Admin doesn't exist then register
      console.log(resSignIn.msg);
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
        return;
      }
      console.log(resRegistration.msg);
      return;
    }
    console.log(resSignIn.msg);
    return;
  } catch (err) {
    console.log("Auth Failed");
    return;
  }
};

export default AuthAdmin;
export { signInAdmin };
