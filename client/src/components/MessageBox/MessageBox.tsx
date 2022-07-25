import React from "react";
import { useSelector } from "react-redux";
import "../../styles/components/messageBox.css";
import InnerMessageBox from "./InnerUserMessageBox";
import MessagesList from "./MessagesList";
import { AppState } from "../../services/redux";
import { CurrentUserMessageState } from "../../services/redux/components/messageBox/currentUserMessage/types";

const MessageBox = (): JSX.Element => {
  const mainPageMessageOnOffState = useSelector(
    (state: AppState) => state.changeMainPageMessageView
  );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state: AppState) => state.mainPageInnerMessageBoxOnOff
  );

  if (mainPageMessageOnOffState === true) {
    return (
      <>
        <div className="MainPage_MessageBox_Container">
          {mainPageInnerMessageBoxOnOffState ? (
            <InnerMessageBox />
          ) : (
            <MessagesList />
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default MessageBox;
