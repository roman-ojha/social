import React from "react";
import SignUp_illustration from "../../assets/svg/SignUp_illustration.svg";
import constant from "../../constant/constant";

const SignUpLeftPart = (): JSX.Element => {
  return (
    <>
      <div className="SignUp_Page_Left_Half">
        <div className="SignUp_Page_Title_Container">
          <h1 className="SignUp_Page_Logo">{constant.applicationName}</h1>
          <h3 className="SignUp_Page_Sign_Up_Logo">Sign Up</h3>
        </div>
        <img
          className="SignUp_Page_Illustration"
          src={SignUp_illustration}
          alt="Sign Up"
        ></img>
      </div>
    </>
  );
};

export default SignUpLeftPart;
