import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { mainPageMessageInnerViewOnOff } from "../../services/redux-actions/index";
import "../../styles/components/messageBox.css";
import SingleMessage from "./SingleMessage";
import SendMessageInputField from "./SendMessageInputField";

const InnerMessageBox = (props) => {
  const dispatch = useDispatch();
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );

  // Styling Loading Spinner
  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(199 199 199 / 22%)",
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
    // socket.on("send-message-client", (res) => {
    //   if (res.success !== false) {
    //     dispatch(
    //       appendOnMessage({
    //         ...res.msgInfo,
    //         _id: `${Math.random()}`,
    //       })
    //     );
    //   }
    // });
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
          />
          <h3>{props.InternalMessageInfo.messageToUserId}</h3>
          <CloseIcon
            className="MessageBox_InnerMessage_Upper_Part_Close_Button"
            style={{ width: "1.2rem", height: "1.2rem" }}
            onClick={() => {
              dispatch(mainPageMessageInnerViewOnOff(false));
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

export default InnerMessageBox;
