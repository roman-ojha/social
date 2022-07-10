import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import {
//   changeRootUserNameAction,
//   startProgressBar,
//   stopProgressBar,
// } from "../../services/redux-actions";
import settingPageApi from "../../services/api/pages/settingPageApi";
import { toastError, toastSuccess } from "../../services/toast";
import { AxiosError } from "axios";
import { actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { Button } from "@mui/material";

const ChangeDisplayName = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState<string>("");
  const { changeRootUserNameAction, startProgressBar, stopProgressBar } =
    bindActionCreators(actionCreators, dispatch);

  const changeName = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      startProgressBar();
      const res = await settingPageApi.changeName(newName);
      const resData = await res.data;
      if (resData.success && res.status === 200) {
        toastSuccess(resData.msg);
        changeRootUserNameAction(resData.name);
      } else {
        toastError(resData.msg);
      }
      stopProgressBar();
      setNewName("");
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
        <label htmlFor="setting-page-change-display-name">
          Change display name
        </label>
        <form onSubmit={changeName}>
          <input
            id="setting-page-change-display-name"
            type="text"
            placeholder="Display Name"
            name="name"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <Button type="submit">Change</Button>
        </form>
        <p>Not require to be unique</p>
      </div>
    </>
  );
};

export default ChangeDisplayName;
