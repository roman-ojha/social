import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mainPageMessageViewOnOff } from "../redux-actions/index";

const MessagePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mainPageMessageViewOnOff(false));
  }, []);
  return (
    <>
      <div className="MessagePage_Container">
        <h1>Message Page</h1>
      </div>
    </>
  );
};

export default MessagePage;
