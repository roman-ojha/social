import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import SingleMessage from "./SingleMessage";
import SendMessageInputField from "./SendMessageInputField";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import useRouteToProfilePage from "../../hooks/useRouteToProfilePage";
import socket from "../../services/socket";

const InnerUserMessage = (props): JSX.Element => {
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const currentMessageStore = useSelector(
    (state: AppState) => state.setCurrentUserMessageReducer
  );
  const { mainPageMessageInnerViewOnOff, appendOnCurrentInnerUserMessage } =
    bindActionCreators(actionCreators, dispatch);

  // Styling Loading Spinner
  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(199 199 199 / 22%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const loadingSpinnerStyle = {
    border: "5px dotted #dddddd",
    borderTop: "5px dotted var(--primary-color-darker-5)",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    animation: "loadingSpinner 1s linear infinite",
  };

  useEffect(() => {
    socket.on("send-message-client", (res) => {
      if (res.success) {
        if (res.msgInfo.senderId === props.InternalMessageInfo.messageToId) {
          console.log(props.InternalMessageInfo.messageToId);
          console.log(props.InternalMessageInfo.messageToUserId);
          console.log(res.msgInfo.senderId);
          console.log(
            res.msgInfo.senderId === props.InternalMessageInfo.messageToId
          );
          appendOnCurrentInnerUserMessage({
            ...res.msgInfo,
            _id: `${Math.random()}`,
          });
        }
      }
    });
  }, []);

  return (
    <>
      <div className="MessageBox_InnerMessage_Container">
        <div className="MessageBox_InnerMessage_Upper_Part_Container">
          <img
            src={
              props.InternalMessageInfo.picture
                ? props.InternalMessageInfo.picture
                : User_Profile_Icon
            }
            alt="user"
            onClick={async () => {
              await routeToProfilePage({
                userID: props.InternalMessageInfo.messageToUserId,
                from: "messagePage",
              });
            }}
          />
          <h3
            onClick={async () => {
              await routeToProfilePage({
                userID: props.InternalMessageInfo.messageToUserId,
                from: "messagePage",
              });
            }}
          >
            {props.InternalMessageInfo.messageToUserId}
          </h3>
          <CloseIcon
            className="MessageBox_InnerMessage_Upper_Part_Close_Button"
            style={{ width: "1.2rem", height: "1.2rem" }}
            onClick={() => {
              mainPageMessageInnerViewOnOff(false);
            }}
          />
        </div>
        <div className="MessageBox_InnerMessage_Message_Container">
          {currentMessageStore.fetchedInnerMessage === false ? (
            <div style={loadingContainerSpinnerStyle}>
              <div style={loadingSpinnerStyle}></div>
            </div>
          ) : (
            currentMessageStore.message.map((message, index) => {
              return (
                <SingleMessage
                  MessageInfo={message}
                  messageToUserId={props.InternalMessageInfo.messageToUserId}
                  picture={currentMessageStore.receiverPicture}
                  key={index}
                />
              );
            })
          )}
        </div>

        <SendMessageInputField
          messageToUserId={props.InternalMessageInfo.messageToUserId}
          messageToId={props.InternalMessageInfo.messageToId}
          receiverPicture={props.InternalMessageInfo.picture}
        />
      </div>
    </>
  );
};

export default InnerUserMessage;
