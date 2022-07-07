import React from "react";
import { toastInfo } from "../../services/toast";
import Sign_In_Facebook_Logo from "../../assets/Images/Facebook_Logo.png";
import Sign_In_Google_Logo from "../../assets/Images/Google_Logo.png";
import SignIn_RightSide_Issustration from "../../assets/svg/SignIn_RightSide_Issustration.svg";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {},
  buttonRipple: { color: "var(--primary-color-opacity-3)" },
});

const SignInRightPart = (): JSX.Element => {
  const ButtonClass = useStyles();
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
      <div className="SignIn_Page_Right_Half_container">
        <div className="SignIn_Page_Right_Half">
          <div className="SignIn_RightSide_Issustration_container">
            <img
              className="SignIn_RightSide_Issustration"
              src={SignIn_RightSide_Issustration}
              alt="SignIn"
            />
          </div>

          <Button
            onClick={signInWithGoogle}
            id="SignIn_page_Google_Button"
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
          >
            <img
              id="SignIn_page_Google_Button_Logo"
              src={Sign_In_Google_Logo}
              alt="Google"
            />
            <p id="SignIn_page_Google_Button_Paragraph">
              SignIn in With Google
            </p>
          </Button>
          <Button
            TouchRippleProps={{ classes: { root: ButtonClass.buttonRipple } }}
            className={ButtonClass.root}
            id="SignIn_page_Facebook_Button"
            onClick={signInWithFacebook}
          >
            <img
              id="SignIn_page_Facebook_Button_Logo"
              src={Sign_In_Facebook_Logo}
              alt="Facebook"
            />
            <p id="SignIn_page_Facebook_Button_Paragraph">
              Sign in With Facebook
            </p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignInRightPart;
