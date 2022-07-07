import React, { useState } from "react";
import { instance as axios } from "../services/axios";
import { NavLink, useHistory } from "react-router-dom";
import "../styles/pages/signInPage.css";
import { Helmet } from "react-helmet";
// import { startProgressBar, stopProgressBar } from "../services/redux-actions";
import { useDispatch } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import { toastError, toastInfo } from "../services/toast";
import { AxiosError } from "axios";
import { actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import SignInHeader from "../components/SignInPage/SignInHeader";
import SignInRightPart from "../components/SignInPage/SignInRightPart";
// import { Button } from "@mui/material";

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const { startProgressBar, stopProgressBar } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [signInDetail, setSignInDetail] = useState({
    email: "",
    password: "",
  });
  let name: string, value: string;
  const getSignInDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      startProgressBar();
      const res = await axios({
        method: "POST",
        url: "/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(signInDetail),
        withCredentials: true,
      });
      stopProgressBar();
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
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      stopProgressBar();
    }
  };

  return (
    <>
      <ProgressBar />
      <div className="SignIn_Page_Container">
        <Helmet>
          <title>SignIn</title>
        </Helmet>
        <div className="SignIn_Page_Left_Half">
          <SignInHeader />
          <div className="SignIn_Container_Outline">
            <form onSubmit={signingIn} className="SignIn_Container">
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
              <button
                // variant="contained"
                id="SignIn_Page_SignIn_Button"
                type="submit"
              >
                Sign In
              </button>
              <button
                // variant="contained"
                id="SignIn_Page_Create_Account_Button"
              >
                <NavLink exact to="/register">
                  Create New Account
                </NavLink>
              </button>
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
        <SignInRightPart />
      </div>
    </>
  );
};

export default SignIn;
