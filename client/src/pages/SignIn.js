import React, { useState } from "react";
import Sign_In_Facebook_Logo from "../assets/Images/Facebook_Logo.png";
import Sign_In_Google_Logo from "../assets/Images/Google_Logo.png";
import SignIn_RightSide_Issustration from "../assets/svg/SignIn_RightSide_Issustration.svg";
import { instance as axios } from "../services/axios";
import { NavLink, useHistory } from "react-router-dom";
import "../styles/pages/signInPage.css";
import { Helmet } from "react-helmet";
import { startProgressBar, stopProgressBar } from "../services/redux-actions";
import { useDispatch } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import { toastError, toastInfo } from "../services/toast";
import constant from "../constant/constant";

const SignIn = () => {
  const dispatch = useDispatch();
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
      dispatch(startProgressBar());
      const res = await axios({
        method: "POST",
        url: "/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(signInDetail),
        withCredentials: true,
      });
      dispatch(stopProgressBar());
      // console.log(res.status);
      if (res.status !== 200) {
        // console.log(data);
        setSignInDetail({
          email: "",
          password: "",
        });
      } else {
        // For Cors domain
        // setCookie("AuthToken", data.token, new Date(Date.now() + 25892000000));
        history.push("/u/home");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(stopProgressBar());
    }
  };
  const signInWithGoogle = async () => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, "_self");
    // window.open("<URL>", "<MODE>");
    // here this will open the google authentication
  };

  const signInWithFacebook = () => {
    toastInfo("Facebook auth is under development, Please use Google auth");
  };

  return (
    <>
      <ProgressBar />
      <div className="SignIn_Page_Container">
        <Helmet>
          <title>SignIn</title>
        </Helmet>
        <div className="SignIn_Page_Left_Half">
          <div className="SignIn_Page_Left_side_Upper_Logo_Part">
            <h1 className="SignIn_Page_Social_Logo">
              {constant.applicationName}
            </h1>
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
              <p
                className="SignIn_Page_Forgot_Password_Button"
                onClick={() => {
                  toastInfo("Email aren't verified, So can't use this feature");
                }}
              >
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
            <button
              className="SignIn_page_Facebook_Button"
              onClick={signInWithFacebook}
            >
              <img
                className="SignIn_page_Facebook_Button_Logo"
                src={Sign_In_Facebook_Logo}
                alt="Facebook"
              />
              <p className="SignIn_page_Facebook_Button_Paragraph">
                Sign in With Facebook
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
