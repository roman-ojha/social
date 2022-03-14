import React from "react";
import { Icon } from "@iconify/react";
import "../styles/react-components/taost.css";

let stat;
let msg;
let style = {
  visibility: "hidden",
};

const toastMessage = (status, message) => {
  stat = status;
  msg = message;
  style = {
    visibility: "visible",
  };
  const showToastTimeOut = setTimeout(() => {
    style = {
      visibility: "hidden",
    };
    clearInterval(showToastTimeOut);
  }, 4000);
};

const Toast = (props) => {
  return (
    <>
      <div className="Toast_Container" style={style}>
        {stat === "error" ? (
          <Icon icon="ic:baseline-error-outline" />
        ) : stat === "notAccessible" ? (
          <Icon icon="ic:outline-do-not-disturb" />
        ) : stat === "done" ? (
          <Icon icon="ic:baseline-cloud-done" />
        ) : (
          ""
        )}
        <h1>{msg}</h1>
      </div>
    </>
  );
};

export default Toast;
export { toastMessage };
