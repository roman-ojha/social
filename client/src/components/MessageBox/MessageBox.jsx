import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import socket from "../../services/socket";
import {
  mainPageMessageViewOnOff,
  currentUserMessageAction,
  mainPageMessageInnerViewOnOff,
} from "../../services/redux-actions/index";
import { instance as axios } from "../../services/axios";
import "../../styles/components/messageBox.css";
import InnerMessageBox from "./InnerUserMessageBox";

const MessageBox = () => {
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state) => state.mainPageInnerMessageBoxOnOff
  );
  const messageList = useSelector((state) => state.messageListReducer);

  const UserMessage = (props) => {
    const showInnerMessage = async () => {
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
        socket.emit("join-room", resData.roomID, (resMessage) => {
          console.log(resMessage);
        });
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

  const ReturnMessageListBox = () => {
    return (
      <>
        <div className="MainPage_Scrollable_MessageBox_Container">
          <div className="MainPage_MessageBox_Title_Container">
            <h4>Message</h4>
            <MoreHorizIcon
              className="MainPage_MessageBox_Title_More_Icon"
              style={{ height: "1.3rem", width: "1.3rem" }}
            />
          </div>
          <hr className="MainPage_MessageBox_Title_Search_Divider" />

          <div className="MainPage_MessageBox_Search_Container">
            <SearchIcon
              className="MainPage_MessageBox_Search_Icon"
              style={{ height: "1.3rem", width: "1.3rem" }}
            />
            <input
              type="text"
              placeholder="Search"
              className="MainPage_MessageBox_Search_Input_Field"
            />
          </div>
          <div className="MainPage_MessageBox_Message_Container">
            {/* displaying all current user message */}

            {messageList.map((messageInfo, index) => {
              if (messageInfo.message.length !== 0) {
                return <UserMessage messageInfo={messageInfo} key={index} />;
              }
            })}
          </div>
        </div>
        <div className="MainPage_MessageBox_See_More_Message_Container">
          <NavLink
            to="/u/message"
            onClick={() => {
              dispatch(mainPageMessageViewOnOff(false));
              let previouslySelectedElement;
              try {
                const selectedLinkElement = document.getElementsByClassName(
                  "MainPage_SideBar_Link"
                )[2];
                selectedLinkElement.firstElementChild.style.backgroundColor =
                  "var(--primary-color-point-7)";
                selectedLinkElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
                  "var(--primary-color-point-7)";
                selectedLinkElement.firstElementChild.nextElementSibling.style.color =
                  "var(--primary-color-point-7)";
                previouslySelectedElement = selectedLinkElement;
              } catch (err) {}
            }}
          >
            See More Message
          </NavLink>
        </div>
      </>
    );
  };

  if (mainPageMessageOnOffState === true) {
    return (
      <>
        <div className="MainPage_MessageBox_Container">
          {mainPageInnerMessageBoxOnOffState ? (
            <InnerMessageBox
              InternalMessageInfo={{
                messageToUserId: currentMessageStore.messageToUserId,
                messageToId: currentMessageStore.messageToId,
                picture: currentMessageStore.receiverPicture,
              }}
            />
          ) : (
            <ReturnMessageListBox />
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default MessageBox;
