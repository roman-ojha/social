import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import "../styles/components/messageBox.css";
import "../styles/pages/MessagePage.css";
import InnerUserMessage from "../components/MessagePage/InnerUserMessage";
import MessagesList from "../components/MessagePage/MessagesList";
import { mainPageMessageViewOnOff } from "../services/redux-actions/index";

const Message = () => {
  const dispatch = useDispatch();
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state) => state.mainPageInnerMessageBoxOnOff
  );

  useEffect(() => {
    dispatch(mainPageMessageViewOnOff(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>
      <div className="MessagePage_Container">
        <div className="MainPage_MessageBox_Container">
          {mainPageInnerMessageBoxOnOffState ? (
            <InnerUserMessage
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
      </div>
    </>
  );
};

export default Message;
