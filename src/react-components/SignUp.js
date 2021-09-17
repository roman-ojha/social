import React, { useState } from "react";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import SignUp_illustration from "../Images/SignUp_illustration.svg";
const SignUp = () => {
  let today = new Date();
  let birthdayYear = [];
  for (let i = 1900; i <= today.getFullYear(); i++) {
    birthdayYear.push(i);
  }
  let birthdayMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let birthdayDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  // Login of selecting gender
  let previousSelectGenderElement;
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
  };
  return (
    <>
      <div className="SignUp_Page_Container">
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
            <form className="SignUp_Page_SignUp_Form">
              <div className="SignUp_Page_Input_Field_Container">
                <input
                  className="SignUp_Page_Full_Name_Input_Field"
                  type="text"
                  placeholder="Full name"
                />
                <input
                  className="SignUp_Page_Email_Address_Input_Field"
                  type="email"
                  placeholder="Email Address"
                />
                <input
                  className="SignUp_Page_Password_Input_Field"
                  type="password"
                  placeholder="Password"
                />
                <input
                  className="SignUp_Page_Conform_Password_Input_Field"
                  type="password"
                  placeholder="Conform Password"
                />
              </div>
              <div className="SignUp_Page_Birthday_Selection_Container">
                <p>Birthday</p>
                <div className="SignUp_Page_Birthday_Selection_Date_Container">
                  <select
                    className="SignUp_Page_Birthday_Year_Selection"
                    defaultValue="YY"
                  >
                    <option>YY</option>
                    {birthdayYear.map((value, index) => {
                      return (
                        <>
                          <option>{value}</option>
                        </>
                      );
                    })}
                  </select>
                  <select className="SignUp_Page_Birthday_Month_Selection">
                    <option>MM</option>
                    {birthdayMonth.map((value, index) => {
                      return <option>{value}</option>;
                    })}
                  </select>
                  <select className="SignUp_Page_Birthday_Day_Selection">
                    <option>DD</option>
                    {birthdayDays.map((value, index) => {
                      return <option>{value}</option>;
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
                      Others
                    </p>
                    <input
                      className="SignUp_Page_Others_CheckBox"
                      type="checkbox"
                      name="other"
                      value="off"
                    />
                  </div>
                </div>
              </div>
              <div className="SignUp_Page_Submit_Container">
                <button className="SignUp_Page_SignUp_Button">Sign Up</button>
                <button className="SignUp_Page_SignIn_Button">
                  <p className="SignUp_Page_SignIn_Button_Title">Sign In</p>
                  <ForwardOutlinedIcon className="SignUp_Page_SignIn_Button_Icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
