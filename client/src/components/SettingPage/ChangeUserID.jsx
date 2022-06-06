import React, { useState } from "react";
import settingPageApi from "../../services/api/pages/settingPageApi";
import { useDispatch } from "react-redux";
import {
  changeRootUserUserIDAction,
  startProgressBar,
  stopProgressBar,
} from "../../services/redux-actions";
import { toastError, toastSuccess } from "../../services/toast";

const ChangeUserID = () => {
  const dispatch = useDispatch();
  const [newUserID, setNewUserID] = useState("");

  const changeUserID = async (e) => {
    try {
      e.preventDefault();
      dispatch(startProgressBar());
      //   console.log(newUserID);
      const res = await settingPageApi.changeUserID(newUserID);
      const resData = await res.data;
      if (resData.success) {
        toastSuccess(resData.msg);
        dispatch(changeRootUserUserIDAction(resData.userID));
      } else {
        toastError(resData.msg);
      }
      dispatch(stopProgressBar());
      setNewUserID("");
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
        <label htmlFor="setting-page-change-userID">Change UserID</label>
        <form>
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
          <button onClick={changeUserID}>Change</button>
        </form>
        <p>You can only be able to set unique ID for your profile</p>
      </div>
    </>
  );
};

export default ChangeUserID;
