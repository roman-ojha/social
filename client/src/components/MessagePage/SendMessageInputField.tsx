import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../services/socket";
import { Icon } from "@iconify/react";
import { isEmptyString } from "../../funcs/isEmptyString";
import { toastError } from "../../services/toast";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";

const SendMessageInputField = (props): JSX.Element => {
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const [userMessageField, setUserMessageField] = useState("");
  const currentMessageStore = useSelector(
    (state: AppState) => state.setCurrentUserMessageReducer
  );
  const { appendOnCurrentInnerUserMessage, appendMessageOnMessageListAction } =
    bindActionCreators(actionCreators, dispatch);

  const sendMessage = async (): Promise<void> => {
    // sending message to user
    try {
      if (isEmptyString(userMessageField)) {
        setUserMessageField("");
        return;
      }
      const resBody = {
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
        if (res.success) {
          appendOnCurrentInnerUserMessage({
            ...res.msgInfo,
            _id: `${Math.random()}`,
          });
          appendMessageOnMessageListAction({
            msgInfo: {
              ...res.msgInfo,
              _id: `${Math.random()}`,
            },
            id: resBody.receiverId,
            receiverPicture: props.receiverPicture,
            messageToUserId: props.messageToUserId,
          });
        } else {
          toastError(res.msg);
        }
      });
    } catch (error) {
      const err = error as AxiosError;
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
