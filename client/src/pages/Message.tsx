import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import "../styles/components/messageBox.css";
import "../styles/pages/MessagePage.css";
import InnerUserMessage from "../components/MessagePage/InnerUserMessage";
import MessagesList from "../components/MessagePage/MessagesList";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";

const Message = (): JSX.Element => {
  const dispatch = useDispatch();
  // const currentMessageStore = useSelector(
  //   (state: AppState) => state.setCurrentUserMessageReducer
  // );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state: AppState) => state.mainPageInnerMessageBoxOnOff
  );
  const { mainPageMessageViewOnOff } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    mainPageMessageViewOnOff(false);
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>
      <main className="MessagePage_Container">
        <div className="MainPage_MessageBox_Container">
          <OpenSideBarDrawerButton />
          <OpenRightPartDrawerButton />
          {mainPageInnerMessageBoxOnOffState ? (
            <InnerUserMessage
            // InternalMessageInfo={{
            //   messageToUserId: currentMessageStore.messageToUserId,
            //   messageToId: currentMessageStore.messageToId,
            //   picture: currentMessageStore.receiverPicture,
            // }}
            />
          ) : (
            <MessagesList />
          )}
        </div>
      </main>
    </>
  );
};

export default Message;
