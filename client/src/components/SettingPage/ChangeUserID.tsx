import React, { useState } from "react";
import settingPageApi from "../../services/api/pages/settingPageApi";
import { useDispatch } from "react-redux";
import { toastError, toastSuccess } from "../../services/toast";
import { AxiosError } from "axios";
import { actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { Button } from "@mui/material";

const ChangeUserID = () => {
  const dispatch = useDispatch();
  const [newUserID, setNewUserID] = useState<string>("");
  const { startProgressBar, stopProgressBar, changeRootUserUserIDAction } =
    bindActionCreators(actionCreators, dispatch);

  const changeUserIDFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      startProgressBar();
      const res = await settingPageApi.changeUserID(newUserID);
      const resData = await res.data;
      if (resData.success) {
        toastSuccess(resData.msg);
        changeRootUserUserIDAction(resData.userID);
      } else {
        toastError(resData.msg);
      }
      stopProgressBar();
      setNewUserID("");
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
        <label htmlFor="setting-page-change-userID">Change UserID</label>
        <form onSubmit={changeUserIDFunc}>
          <input
            id="setting-page-change-userID"
            type="text"
            placeholder="UserID"
            name="userID"
            value={newUserID}
            onChange={(e) => {
              setNewUserID(e.target.value);
            }}
          />
          <Button type="submit">Change</Button>
        </form>
        <p>You can only be able to set unique ID for your profile</p>
      </div>
    </>
  );
};

export default ChangeUserID;
