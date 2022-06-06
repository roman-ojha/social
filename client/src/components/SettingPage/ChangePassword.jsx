import React from "react";
import { useDispatch } from "react-redux";
import {
  startProgressBar,
  stopProgressBar,
} from "../../services/redux-actions";
import settingPageApi from "../../services/api/pages/settingPageApi";
import { useState } from "react";
import { toastError, toastSuccess } from "../../services/toast";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [inputFieldData, setInputFieldData] = useState({
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
  });

  const getInputFieldData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputFieldData({
      ...inputFieldData,
      [name]: value,
    });
  };

  const changePassword = async (e) => {
    try {
      e.preventDefault();
      dispatch(startProgressBar());
      const res = await settingPageApi.changePassword(inputFieldData);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        toastSuccess(data.msg);
      } else {
        toastError(data.msg);
      }
      dispatch(stopProgressBar());
      setInputFieldData({
        oldPassword: "",
        newPassword: "",
        cNewPassword: "",
      });
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

  return (
    <>
      <div className="Setting_Container_With_Input_Field">
        <h1>Change Password</h1>
        <input
          type="password"
          placeholder="Old password"
          name="oldPassword"
          value={inputFieldData.oldPassword}
          onChange={getInputFieldData}
        />
        <input
          type="password"
          placeholder="New password"
          name="newPassword"
          value={inputFieldData.newPassword}
          onChange={getInputFieldData}
        />
        <form>
          <input
            type="password"
            placeholder="Conform password"
            name="cNewPassword"
            value={inputFieldData.cNewPassword}
            onChange={getInputFieldData}
          />
          <button onClick={changePassword}>Change</button>
        </form>
        <p>Don't Forgot Your Password</p>
      </div>
    </>
  );
};

export default ChangePassword;
