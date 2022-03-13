import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mainPageMessageViewOnOff } from "../redux-actions/index";
import { Helmet } from "react-helmet";

const MessagePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mainPageMessageViewOnOff(false));
  }, []);
  return (
    <>
      <div className="MessagePage_Container">
        <Helmet>
          <title>Message</title>
        </Helmet>
        <h1>Message Page</h1>
      </div>
    </>
  );
};

export default MessagePage;
