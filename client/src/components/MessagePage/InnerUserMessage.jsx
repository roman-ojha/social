import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import socket from "../../services/socket";
import {
  mainPageMessageInnerViewOnOff,
  appendOnMessage,
  appendMessageOnMessageListAction,
} from "../../services/redux-actions/index";
import { Icon } from "@iconify/react";
import SingleMessage from "./SingleMessage";

const InnerUserMessage = (props) => {
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const [userMessageField, setUserMessageField] = useState("");
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );

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

  const sendMessage = async () => {
    // sending message to user
    try {
      if (userMessageField === "") {
        return;
      }
      const resBody = {
        senderId: userProfileDetailStore.id,
        senderUserId: userProfileDetailStore.userID,
        receiverId: props.InternalMessageInfo.messageToId,
        receiverUserID: props.InternalMessageInfo.messageToUserId,
        // messageTo is the userID of user where we are sending the message
        message: userMessageField,
        roomID: currentMessageStore.roomID,
      };
      setUserMessageField("");
      socket.emit("send-message", resBody, (res) => {
        if (res.success !== false) {
          dispatch(
            appendOnMessage({
              ...res.msgInfo,
              _id: `${Math.random()}`,
            })
          );
          dispatch(
            appendMessageOnMessageListAction({
              ...res.msgInfo,
              _id: `${Math.random()}`,
              receiverId: resBody.receiverId,
            })
          );
        }
      });
    } catch (err) {
      // console.log(err);
    }
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
        <div className="MessageBox_LowerPart_InputField_Container">
          <div className="MessageBox_LowerPart_InputField_Inner_Container">
            <Icon
              className="MessageBox_LowerPart_InputField_Buttons"
              icon="entypo:emoji-happy"
            />
            <input
              type="text"
              value={userMessageField}
              autoFocus
              onChange={(e) => {
                setUserMessageField(e.target.value);
                const eventOnPressEnter = (e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                  window.removeEventListener("keydown", eventOnPressEnter);
                };
                window.addEventListener("keydown", eventOnPressEnter);
              }}
            />
            <Icon
              className="MessageBox_LowerPart_InputField_Buttons"
              icon="akar-icons:image"
            />
            <Icon
              icon="akar-icons:send"
              className="MessageBox_LowerPart_InputField_Buttons"
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerUserMessage;
