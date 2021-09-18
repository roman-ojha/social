import React from "react";
import Sign_In_Facebook_Logo from "../Images/Facebook_Logo.png";
import Sign_In_Google_Logo from "../Images/Google_Logo.png";
import SignIn_RightSide_Issustration from "../Images/SignIn_RightSide_Issustration.svg";
import { Link, NavLink } from "react-router-dom";
function SignIn() {
  return (
    <>
      <div className="SignIn_Page_Container">
        <div className="SignIn_Page_Left_Half">
          <div className="SignIn_Page_Left_side_Upper_Logo_Part">
            <h1 className="SignIn_Page_Social_Logo">Social</h1>
            <h3 className="SignIn_Page_Sign_In_Logo">Sign In</h3>
          </div>
          <div className="SignIn_Container_Outline">
            <form className="SignIn_Container">
              <input
                type="text"
                className="SignIn_Email_Input_Field"
                placeholder="Email Address"
              />
              <input
                type="password"
                className="SingIn_Password_Field"
                placeholder="Password"
              />
              <button className="SignIn_Page_SignIn_Button">Sign In</button>
              <NavLink
                exact
                to="/register"
                className="SignIn_Page_Create_Account_Button"
              >
                Create New Account
              </NavLink>
              <p className="SignIn_Page_Forgot_Password_Button">
                Forgot Password?
              </p>
            </form>
          </div>
        </div>
        <div className="SignIn_Page_Right_Half_container">
          <div className="SignIn_Page_Right_Half">
            <div className="SignIn_RightSide_Issustration_container">
              <img
                className="SignIn_RightSide_Issustration"
                src={SignIn_RightSide_Issustration}
                alt="SignIn"
              />
            </div>

            <button className="SignIn_page_Google_Button">
              <img
                className="SignIn_page_Google_Button_Logo"
                src={Sign_In_Google_Logo}
                alt="Google"
              />
              <p className="SignIn_page_Google_Button_Paragraph">
                SignIn in With Google
              </p>
            </button>
            <button className="SignIn_page_Facebook_Button">
              <img
                className="SignIn_page_Facebook_Button_Logo"
                src={Sign_In_Facebook_Logo}
                alt="Facebook"
              />
              <p className="SignIn_page_Facebook_Button_Paragraph">
                Sign in With Facegbook
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
