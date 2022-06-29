import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../services/socket";
import {
  appendOnCurrentInnerUserMessage,
  appendMessageOnMessageListAction,
} from "../../services/redux-actions/index";
import { Icon } from "@iconify/react";
import { isEmptyString } from "../../funcs/isEmptyString";
import { toastError } from "../../services/toast";

const SendMessageInputField = (props) => {
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const [userMessageField, setUserMessageField] = useState("");
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const sendMessage = async () => {
    // sending message to user
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
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => {
              setUserMessageField(e.target.value);
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
