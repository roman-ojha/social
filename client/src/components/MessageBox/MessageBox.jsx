import React from "react";
import { useSelector } from "react-redux";
import "../../styles/components/messageBox.css";
import InnerMessageBox from "./InnerUserMessageBox";
import MessagesList from "./MessagesList";

const MessageBox = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state) => state.mainPageInnerMessageBoxOnOff
  );

  if (mainPageMessageOnOffState === true) {
    return (
      <>
        <div className="MainPage_MessageBox_Container">
          {mainPageInnerMessageBoxOnOffState ? (
            <InnerMessageBox
              InternalMessageInfo={{
                messageToUserId: currentMessageStore.messageToUserId,
                messageToId: currentMessageStore.messageToId,
                picture: currentMessageStore.receiverPicture,
              }}
            />
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
