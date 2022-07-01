import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { instance as axios } from "../services/axios";
import "../styles/pages/signUpPage.css";
import { Helmet } from "react-helmet";
// import { startProgressBar, stopProgressBar } from "../services/redux-actions";
import { useDispatch } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import validator from "email-validator";
import { Icon } from "@iconify/react";
import { toastError, toastSuccess, toastWarn } from "../services/toast";
import { actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";
import SignUpLeftPart from "../components/SignUpPage/SignUpLeftPart";

let previousSelectGenderElement: HTMLDivElement;
const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const { startProgressBar, stopProgressBar } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const history = useHistory();
  let today = new Date();
  let birthdayYear: number[] = [];
  for (let i = today.getFullYear() - 100; i <= today.getFullYear(); i++) {
    birthdayYear.push(i);
  }
  let birthdayMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let birthdayDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  // getting user Input data
  let name: string, value: string;

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

  const getUserData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
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
  const selectGender = (event: React.MouseEvent<HTMLDivElement>): void => {
    let element = event.target as HTMLDivElement;
    if (
      element.className === "SignUp_Page_Male_CheckBox_Container" ||
      element.className === "SignUp_Page_Female_CheckBox_Container" ||
      element.className === "SignUp_Page_Others_CheckBox_Container"
    ) {
      if (
        (element.firstElementChild!.nextElementSibling as HTMLInputElement)
          .checked === false
      ) {
        (
          element.firstElementChild!.nextElementSibling as HTMLInputElement
        ).checked = true;
      } else {
        (
          element.firstElementChild!.nextElementSibling as HTMLInputElement
        ).checked = false;
      }
      element = element.firstElementChild!.nextElementSibling as HTMLDivElement;
    } else if (
      element.className === "SignUp_Page_Male_CheckBox_Title" ||
      element.className === "SignUp_Page_Female_CheckBox_Title" ||
      element.className === "SignUp_Page_Others_CheckBox_Title"
    ) {
      if ((element.nextElementSibling as HTMLInputElement).checked === false) {
        (element.nextElementSibling as HTMLInputElement).checked = true;
      } else {
        (element.nextElementSibling as HTMLInputElement).checked = false;
      }
      element = element.nextElementSibling as HTMLDivElement;
    }
    if (previousSelectGenderElement !== element) {
      if (previousSelectGenderElement !== undefined) {
        (previousSelectGenderElement as HTMLInputElement).checked = false;
      }
    }
    previousSelectGenderElement = element;
    setuserData({
      ...userData,
      gender: (element as HTMLInputElement).value,
    });
  };

  const registerData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const { name, email, password, cpassword, birthday, gender } = userData;
    if (!name || !email || !password || !cpassword || !birthday || !gender) {
      toastError("Please Fill all Required Field!!!");
      return;
    } else if (!validator.validate(email)) {
      toastWarn("Email is not Valid");
      return;
    }
    try {
      startProgressBar();
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
      stopProgressBar();
      if (res.status === 200 && data.success) {
        toastSuccess(data.msg);
        history.push("/userid?uid=undefined");
      } else {
        toastError(data.msg);
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
      <div className="SignUp_Page_Container">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <SignUpLeftPart />
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
                    // value="male"
                  >
                    <p
                      className="SignUp_Page_Male_CheckBox_Title"
                      // value="male"
                    >
                      Male
                    </p>
                    <input
                      className="SignUp_Page_Male_CheckBox"
                      type="checkbox"
                      name="male"
                      // value="male"
                    />
                  </div>
                  <div
                    className="SignUp_Page_Female_CheckBox_Container"
                    onClick={selectGender}
                    // value="female"
                  >
                    <p
                      className="SignUp_Page_Female_CheckBox_Title"
                      // value="female"
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
                    // value="other"
                  >
                    <p
                      className="SignUp_Page_Others_CheckBox_Title"
                      // value="other"
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
                  <Icon
                    icon="ic:outline-forward"
                    className="SignUp_Page_SignIn_Button_Icon"
                  />
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
