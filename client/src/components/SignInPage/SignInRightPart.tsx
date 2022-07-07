import React from "react";
import { toastInfo } from "../../services/toast";
import Sign_In_Facebook_Logo from "../../assets/Images/Facebook_Logo.png";
import Sign_In_Google_Logo from "../../assets/Images/Google_Logo.png";
import SignIn_RightSide_Issustration from "../../assets/svg/SignIn_RightSide_Issustration.svg";
import { Button } from "@material-ui/core";
import { MUICustomStyles } from "../../interface/MUI";
import { Theme, withStyles } from "@material-ui/core/styles";

export const MUIButtonStyles: MUICustomStyles = (theme: Theme) => ({
  button: {
    // "&:hover": {
    //   backgroundColor: "red",
    // },
  },
  child: {
    backgroundColor: "var(--primary-color-opacity-3)",
  },
  rippleVisible: {
    opacity: 0.5,
    animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes enter": {
    "0%": {
      transform: "scale(0)",
      opacity: 0.1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0.5,
    },
  },
});

const SignInRightPart = ({ classes, ...other }): JSX.Element => {
  const { button: buttonClass, ...rippleClasses } = classes;
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
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
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
            TouchRippleProps={{ classes: rippleClasses }}
            className={buttonClass}
            {...other}
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

export default withStyles(MUIButtonStyles)(SignInRightPart);
