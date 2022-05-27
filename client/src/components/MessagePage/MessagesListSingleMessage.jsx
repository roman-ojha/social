import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import {
  currentUserMessageAction,
  mainPageMessageInnerViewOnOff,
} from "../../services/redux-actions/index";
import { toastError } from "../../services/toast";
import { instance as axios } from "../../services/axios";
import socket from "../../services/socket";
import { useDispatch, useSelector } from "react-redux";

const MessageListSingleMessage = (props) => {
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const showInnerMessage = async () => {
    try {
      // before getting new message we will reset the previous message stored into redux
      dispatch(
        currentUserMessageAction({
          messageToId: props.messageInfo.messageToId,
          messageToUserId: props.messageInfo.messageToUserId,
          receiverPicture: props.messageInfo.receiverPicture,
          message: [],
          fetchedInnerMessage: false,
        })
      );
      dispatch(mainPageMessageInnerViewOnOff(true));
      // console.log(props.messageInfo.messageTo);
      const resMessage = await axios({
        // sending receiver userID to get message data of that user
        method: "POST",
        url: "/u/getMessage",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userID: props.messageInfo.messageToUserId,
          id: props.messageInfo.messageToId,
        }),
        withCredentials: true,
      });
      if (resMessage.status !== 200) {
        const error = await resMessage.data;
      } else {
        const resData = await resMessage.data;
        // after getting message we will store that message into redux
        dispatch(
          currentUserMessageAction({
            messageToId: props.messageInfo.messageToId,
            messageToUserId: props.messageInfo.messageToUserId,
            receiverPicture: props.messageInfo.receiverPicture,
            message: resData.message,
            fetchedInnerMessage: true,
          })
        );
        // if we are inside the user message then we have to join room through socket
        // NOTE: this is just for temporary purposes
        // socket.emit("join-room", resData.roomID, (resMessage) => {
        //   console.log(resMessage);
        // });
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
    }
  };
  return (
    <>
      <div
        className="MaiPage_MessageBox_UserMessage_Container"
        onClick={showInnerMessage}
      >
        <img
          src={
            props.messageInfo.receiverPicture
              ? props.messageInfo.receiverPicture
              : User_Profile_Icon
          }
          alt="user"
          className="MainPage_MessageBox_UserMessage_Picutre"
        />
        <div className="MainPage_MessageBox_UserMessage_Name_Message_Container">
          <h4>{props.messageInfo.messageToUserId}</h4>
          <p>
            {
              props.messageInfo.message[props.messageInfo.message.length - 1]
                .content
              // showing current message
            }
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageListSingleMessage;
