import React, { useState } from "react";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import SignUp_illustration from "../Images/SignUp_illustration.svg";
import { NavLink, useHistory } from "react-router-dom";
import { instance as axios } from "../services/axios";
import "../styles/pages/signUpPage.css";
import { Helmet } from "react-helmet";
import { startProgressBar, stopProgressBar } from "../redux-actions";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../react-components/ProgressBar";
import { toast } from "react-toastify";
import validator from "email-validator";

let previousSelectGenderElement;
const SignUpPage = () => {
  const dispatch = useDispatch();
  const progressBarState = useSelector((state) => state.progressBarReducer);
  const history = useHistory();
  let today = new Date();
  let birthdayYear = [];
  for (let i = today.getFullYear() - 100; i <= today.getFullYear(); i++) {
    birthdayYear.push(i);
  }
  let birthdayMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let birthdayDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  // getting user Input data
  let name, value;

  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    birthday: {
      year: "",
      month: "",
      day: "",
    },
    gender: "",
  });

  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    if (name === "year" || name === "month" || name === "day") {
      setuserData({
        ...userData,
        birthday: {
          ...userData.birthday,
          [name]: value,
        },
      });
    } else {
      setuserData({
        ...userData,
        [name]: value,
      });
    }
  };

  // Login of selecting gender
  const selectGender = (event) => {
    let element = event.target;
    if (
      event.target.className === "SignUp_Page_Male_CheckBox_Container" ||
      event.target.className === "SignUp_Page_Female_CheckBox_Container" ||
      event.target.className === "SignUp_Page_Others_CheckBox_Container"
    ) {
      if (element.firstElementChild.nextElementSibling.checked === false) {
        element.firstElementChild.nextElementSibling.checked = true;
      } else {
        element.firstElementChild.nextElementSibling.checked = false;
      }
      element = element.firstElementChild.nextElementSibling;
    } else if (
      event.target.className === "SignUp_Page_Male_CheckBox_Title" ||
      event.target.className === "SignUp_Page_Female_CheckBox_Title" ||
      event.target.className === "SignUp_Page_Others_CheckBox_Title"
    ) {
      if (element.nextElementSibling.checked === false) {
        element.nextElementSibling.checked = true;
      } else {
        element.nextElementSibling.checked = false;
      }
      element = element.nextElementSibling;
    }
    if (previousSelectGenderElement !== element) {
      if (previousSelectGenderElement !== undefined) {
        previousSelectGenderElement.checked = false;
      }
    }
    previousSelectGenderElement = element;
    setuserData({
      ...userData,
      gender: element.value,
    });
  };

  const registerData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword, birthday, gender } = userData;
    if ((!name || !email || !password || !cpassword, !birthday, !gender)) {
      toast.error("Please Fill all Required Field!!!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
      });
      return;
    } else if (!validator.validate(email)) {
      toast.warn("Email is not Valid", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
      });
      return;
    }
    try {
      dispatch(startProgressBar());
      const res = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/register",
        data: JSON.stringify({
          name,
          email,
          password,
          cpassword,
          birthday,
          gender,
        }),
        withCredentials: true,
      });
      const data = await res.data;
      dispatch(stopProgressBar());
      if (res.status === 422 || !data) {
        console.log(data.error);
      } else {
        console.log(data.message);
        history.push("/userid?uid=undefined");
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toast.error(err.response.data.err, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      } else {
        toast.error("Some Problem Occur, Please Try again Letter!!!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        });
      }
      dispatch(stopProgressBar());
    }
  };

  return (
    <>
      {progressBarState.showProgressBar ? <ProgressBar /> : <></>}
      <div className="SignUp_Page_Container">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <div className="SignUp_Page_Left_Half">
          <div className="SignUp_Page_Title_Container">
            <h1 className="SignUp_Page_Logo">Social</h1>
            <h3 className="SignUp_Page_Sign_Up_Logo">Sign Up</h3>
          </div>
          <img
            className="SignUp_Page_Illustration"
            src={SignUp_illustration}
            alt="Sign Up"
          ></img>
        </div>
        <div className="SignUp_Page_Rignt_Half">
          <div className="SignUp_Page_SignUp_Container">
            <form method="POST" className="SignUp_Page_SignUp_Form">
              <div className="SignUp_Page_Input_Field_Container">
                <input
                  className="SignUp_Page_Full_Name_Input_Field"
                  type="text"
                  placeholder="Full name"
                  name="name"
                  required
                  value={userData.name}
                  onChange={getUserData}
                />
                <input
                  className="SignUp_Page_Email_Address_Input_Field"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={userData.email}
                  onChange={getUserData}
                />
                <input
                  className="SignUp_Page_Password_Input_Field"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={getUserData}
                />
                <input
                  className="SignUp_Page_Conform_Password_Input_Field"
                  type="password"
                  placeholder="Conform Password"
                  name="cpassword"
                  value={userData.cpassword}
                  onChange={getUserData}
                />
              </div>
              <div className="SignUp_Page_Birthday_Selection_Container">
                <p>Birthday</p>
                <div className="SignUp_Page_Birthday_Selection_Date_Container">
                  <select
                    className="SignUp_Page_Birthday_Year_Selection"
                    name="year"
                    value={userData.birthday.year}
                    onChange={getUserData}
                  >
                    <option hidden>YY</option>
                    {birthdayYear.map((value, index) => {
                      return <option key={index}>{value}</option>;
                    })}
                  </select>
                  <select
                    className="SignUp_Page_Birthday_Month_Selection"
                    name="month"
                    value={userData.birthday.month}
                    onChange={getUserData}
                  >
                    <option hidden>MM</option>
                    {birthdayMonth.map((value, index) => {
                      return <option key={index}>{value}</option>;
                    })}
                  </select>
                  <select
                    className="SignUp_Page_Birthday_Day_Selection"
                    name="day"
                    value={userData.birthday.day}
                    onChange={getUserData}
                  >
                    <option hidden>DD</option>
                    {birthdayDays.map((value, index) => {
                      return <option key={index}>{value}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="SignUp_Page_Gender_Checkbox_Container">
                <p>Gender</p>
                <div className="SignUp_Page_Gender_Checkbox_select_Container">
                  <div
                    className="SignUp_Page_Male_CheckBox_Container"
                    onClick={selectGender}
                    value="male"
                  >
                    <p className="SignUp_Page_Male_CheckBox_Title" value="male">
                      Male
                    </p>
                    <input
                      className="SignUp_Page_Male_CheckBox"
                      type="checkbox"
                      name="male"
                      value="male"
                    />
                  </div>
                  <div
                    className="SignUp_Page_Female_CheckBox_Container"
                    onClick={selectGender}
                    value="female"
                  >
                    <p
                      className="SignUp_Page_Female_CheckBox_Title"
                      value="female"
                    >
                      Female
                    </p>
                    <input
                      className="SignUp_Page_Female_CheckBox"
                      type="checkbox"
                      name="female"
                      value="female"
                    />
                  </div>
                  <div
                    className="SignUp_Page_Others_CheckBox_Container"
                    onClick={selectGender}
                    value="other"
                  >
                    <p
                      className="SignUp_Page_Others_CheckBox_Title"
                      value="other"
                    >
                      Other
                    </p>
                    <input
                      className="SignUp_Page_Others_CheckBox"
                      type="checkbox"
                      name="other"
                      value="other"
                    />
                  </div>
                </div>
              </div>
              <div className="SignUp_Page_Submit_Container">
                <button
                  className="SignUp_Page_SignUp_Button"
                  onClick={registerData}
                >
                  Sign Up
                </button>
                <NavLink
                  exact
                  to="/signin"
                  className="SignUp_Page_SignIn_Button"
                >
                  <p className="SignUp_Page_SignIn_Button_Title">Sign In</p>
                  <ForwardOutlinedIcon className="SignUp_Page_SignIn_Button_Icon" />
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
