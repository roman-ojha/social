import React from "react";
import constant from "../../constant/constant";
import { useHistory } from "react-router-dom";

const SignInHeader = (): JSX.Element => {
  const history = useHistory();
  return (
    <>
      <div className="SignIn_Page_Left_side_Upper_Logo_Part">
        <h1
          onClick={() => {
            history.push("/u/home");
          }}
          className="SignIn_Page_Social_Logo"
          style={{ cursor: "pointer" }}
        >
          {constant.applicationName}
        </h1>
        <h3 className="SignIn_Page_Sign_In_Logo">Sign In</h3>
      </div>
    </>
  );
};

export default SignInHeader;
