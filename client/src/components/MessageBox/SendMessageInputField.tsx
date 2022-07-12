import React, { useState } from "react";
import { Icon } from "@iconify/react";
import socket from "../../services/socket";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyString } from "../../funcs/isEmptyString";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";
import { toastError } from "../../services/toast";

const SendMessageInputField = (props): JSX.Element => {
  const dispatch = useDispatch();
  const [userMessageField, setUserMessageField] = useState<string>("");
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const currentMessageStore = useSelector(
    (state: AppState) => state.setCurrentUserMessageReducer
  );
  const { appendOnCurrentInnerUserMessage, appendMessageOnMessageListAction } =
    bindActionCreators(actionCreators, dispatch);

  const sendMessage = async (): Promise<void> => {
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
        // roomID: currentMessageStore.roomID,
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
