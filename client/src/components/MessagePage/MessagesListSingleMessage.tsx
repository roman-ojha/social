import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
// import {
//   currentUserMessageAction,
//   mainPageMessageInnerViewOnOff,
// } from "../../services/redux-actions/index";
import { toastError } from "../../services/toast";
import { instance as axios } from "../../services/axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";

const MessageListSingleMessage = (props): JSX.Element => {
  const dispatch = useDispatch();
  const { currentUserMessageAction, mainPageMessageInnerViewOnOff } =
    bindActionCreators(actionCreators, dispatch);

  const showInnerMessage = async (): Promise<void> => {
    try {
      // before getting new message we will reset the previous message stored into redux
      currentUserMessageAction({
        messageToId: props.messageInfo.messageToId,
        messageToUserId: props.messageInfo.messageToUserId,
        receiverPicture: props.messageInfo.receiverPicture,
        message: [],
        fetchedInnerMessage: false,
      });
      mainPageMessageInnerViewOnOff(true);
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
        // const error = await resMessage.data;
      } else {
        const resData = await resMessage.data.data;
        // after getting message we will store that message into redux
        currentUserMessageAction({
          messageToId: props.messageInfo.messageToId,
          messageToUserId: props.messageInfo.messageToUserId,
          receiverPicture: props.messageInfo.receiverPicture,
          message: resData.message,
          fetchedInnerMessage: true,
        });
      }
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
