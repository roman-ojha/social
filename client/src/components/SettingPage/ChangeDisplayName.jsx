import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeRootUserNameAction,
  startProgressBar,
  stopProgressBar,
} from "../../services/redux-actions";
import settingPageApi from "../../services/api/pages/settingPageApi";
import { toastError, toastSuccess } from "../../services/toast";

const ChangeDisplayName = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");

  const changeName = async (e) => {
    try {
      e.preventDefault();
      dispatch(startProgressBar());
      const res = await settingPageApi.changeName(newName);
      const resData = await res.data;
      if (resData.success && res.status === 200) {
        toastSuccess(resData.msg);
        dispatch(changeRootUserNameAction(resData.name));
      } else {
        toastError(resData.msg);
      }
      dispatch(stopProgressBar());
      setNewName("");
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
        <label htmlFor="setting-page-change-display-name">
          Change display name
        </label>
        <form>
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
          <button onClick={changeName}>Change</button>
        </form>
        <p>Not require to be unique</p>
      </div>
    </>
  );
};

export default ChangeDisplayName;
