import React, { useState } from "react";
import { Icon } from "@iconify/react";
import socket from "../../services/socket";
import {
  appendOnCurrentInnerUserMessage,
  appendMessageOnMessageListAction,
} from "../../services/redux-actions/index";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyString } from "../../funcs/isEmptyString";

const SendMessageInputField = (props) => {
  const dispatch = useDispatch();
  const [userMessageField, setUserMessageField] = useState("");
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );

  const sendMessage = async () => {
    try {
      if (isEmptyString(userMessageField)) {
        setUserMessageField("");
        return;
      }
      const resBody = {
        senderId: userProfileDetailStore.id,
        senderUserId: userProfileDetailStore.userID,
        senderPicture: userProfileDetailStore.picture,
        receiverId: props.messageToId,
        receiverUserID: props.messageToUserId,
        // messageTo is the userID of user where we are sending the message
        message: userMessageField,
        roomID: currentMessageStore.roomID,
      };
      setUserMessageField("");
      socket.emit("send-message", resBody, (res) => {
        if (res.success !== false) {
          dispatch(
            appendOnCurrentInnerUserMessage({
              ...res.msgInfo,
              _id: `${Math.random()}`,
            })
          );
          dispatch(
            appendMessageOnMessageListAction({
              msgInfo: {
                ...res.msgInfo,
                _id: `${Math.random()}`,
              },
              id: resBody.receiverId,
              receiverPicture: props.receiverPicture,
              messageToUserId: props.messageToUserId,
            })
          );
        }
      });
    } catch (err) {}
  };

  return (
    <>
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
              // dispatch(userMessageFieldAction(e.target.value));
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
    </>
  );
};

export default SendMessageInputField;
