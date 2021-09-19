import React, { useState } from "react";
import Sign_In_Facebook_Logo from "../Images/Facebook_Logo.png";
import Sign_In_Google_Logo from "../Images/Google_Logo.png";
import SignIn_RightSide_Issustration from "../Images/SignIn_RightSide_Issustration.svg";
import { NavLink, useHistory } from "react-router-dom";
function SignIn() {
  const [signInDetail, setSignInDetail] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const getSignInDetail = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSignInDetail({
      ...signInDetail,
      [name]: value,
    });
  };
  const history = useHistory();
  const signingIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInDetail),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        console.log(data);
        setSignInDetail({
          email: "",
          password: "",
        });
      } else {
        console.log(data);
        history.push("/");
      }
    } catch (err) {
      // console.log(err);
    }
  };
  const signInWithGoogle = async () => {
    window.open("http://localhost:8080/auth/google", "_self");
    // window.open("<URL>", "<MODE>");
    // here this will open the google authentication
  };
  return (
    <>
      <div className="SignIn_Page_Container">
        <div className="SignIn_Page_Left_Half">
          <div className="SignIn_Page_Left_side_Upper_Logo_Part">
            <h1 className="SignIn_Page_Social_Logo">Social</h1>
            <h3 className="SignIn_Page_Sign_In_Logo">Sign In</h3>
          </div>
          <div className="SignIn_Container_Outline">
            <form method="POST" className="SignIn_Container">
              <input
                type="email"
                className="SignIn_Email_Input_Field"
                placeholder="Email Address"
                name="email"
                value={signInDetail.email}
                onChange={getSignInDetail}
              />
              <input
                type="password"
                className="SingIn_Password_Field"
                placeholder="Password"
                name="password"
                value={signInDetail.password}
                onChange={getSignInDetail}
              />
              <button className="SignIn_Page_SignIn_Button" onClick={signingIn}>
                Sign In
              </button>
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

            <button
              onClick={signInWithGoogle}
              className="SignIn_page_Google_Button"
            >
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
