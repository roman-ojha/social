import React from "react";
import { useDispatch } from "react-redux";
import settingPageApi from "../../services/api/pages/settingPageApi";
import { useState } from "react";
import { toastError, toastSuccess } from "../../services/toast";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../services/redux";
import { AxiosError } from "axios";
import { Button } from "@mui/material";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [inputFieldData, setInputFieldData] = useState<{
    oldPassword: string;
    newPassword: string;
    cNewPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
  });
  const { startProgressBar, stopProgressBar } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const getInputFieldData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputFieldData({
      ...inputFieldData,
      [name]: value,
    });
  };

  const changePasswordFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      startProgressBar();
      const res = await settingPageApi.changePassword(inputFieldData);
      const data = await res.data;
      if (res.status === 200 && data.success) {
        toastSuccess(data.msg);
      } else {
        toastError(data.msg);
      }
      stopProgressBar();
      setInputFieldData({
        oldPassword: "",
        newPassword: "",
        cNewPassword: "",
      });
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
      <div className="Setting_Container_With_Input_Field">
        <label htmlFor="setting-page-change-password">Change Password</label>
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
        <form onSubmit={changePasswordFunc}>
          <input
            id="setting-page-change-password"
            type="password"
            placeholder="Conform password"
            name="cNewPassword"
            value={inputFieldData.cNewPassword}
            onChange={getInputFieldData}
          />
          <Button type="submit">Change</Button>
        </form>
        <p>Don't Forgot Your Password</p>
      </div>
    </>
  );
};

export default ChangePassword;
