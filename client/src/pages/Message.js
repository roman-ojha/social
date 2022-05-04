import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import User_Profile_Icon from "../assets/Images/User_profile_Icon.svg";
import socket from "../services/socket";
import {
  mainPageMessageViewOnOff,
  currentUserMessageAction,
  mainPageMessageInnerViewOnOff,
  appendOnMessage,
  appendMessageOnMessageListAction,
} from "../redux-actions/index";
import { instance as axios } from "../services/axios";
import "../styles/react-components/messageBox.css";
import "../styles/pages/MessagePage.css";
import { Icon } from "@iconify/react";

const Message = () => {
  const dispatch = useDispatch();
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state) => state.mainPageInnerMessageBoxOnOff
  );
  const messageList = useSelector((state) => state.messageListReducer);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [userMessageField, setUserMessageField] = useState("");

  const UserMessage = (props) => {
    const showInnerMessage = async () => {
      // before getting new message we will reset the previous message stored into redux
      dispatch(
        currentUserMessageAction({
          messageTo: props.messageInfo.messageTo,
          receiverPicture: props.messageInfo.receiverPicture,
          message: [],
        })
      );
      dispatch(mainPageMessageInnerViewOnOff(true));
      setShowLoadingSpinner(true);
      // console.log(props.messageInfo.messageTo);
      const resMessage = await axios({
        // sending receiver userID to get message data of that user
        method: "POST",
        url: "/u/getMessage",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ userID: props.messageInfo.messageTo }),
        withCredentials: true,
      });
      if (resMessage.status !== 200) {
        const error = await resMessage.data;
      } else {
        const message = await resMessage.data;
        // after getting message we will store that message into redux
        dispatch(currentUserMessageAction(message));
        setShowLoadingSpinner(false);
        // if we are inside the user message then we have to join room through socket
        // NOTE: this is just for temporary purposes
        socket.emit("join-room", message.roomID, (resMessage) => {
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
            <h4>{props.messageInfo.messageTo}</h4>
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
            {messageList.map((messageInfo) => {
              if (messageInfo.message.length !== 0) {
                return (
                  <UserMessage
                    messageInfo={messageInfo}
                    key={messageInfo._id}
                  />
                );
              }
            })}
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    dispatch(mainPageMessageViewOnOff(false));
    socket.on("send-message-client", (res) => {
      if (res.success !== false) {
        dispatch(
          appendOnMessage({
            ...res.msgInfo,
            _id: `${Math.random()}`,
          })
        );
      }
    });
  }, []);
  const ReturnInnerUserMessageBox = (props) => {
    const UserSingleMessageBox = (props) => {
      return (
        <>
          <div
            className="MessageBox_Inner_SingleMessage_Container"
            // styling the position of the message box according the user
            style={
              props.MessageInfo.sender === userProfileDetailStore.userID
                ? {
                    left: "31%",
                  }
                : {}
            }
          >
            {props.MessageInfo.sender === userProfileDetailStore.userID ? (
              ""
            ) : (
              <img src={props.picture ? props.picture : User_Profile_Icon} />
            )}
            <div
              className="MessageBox_Inner_SingleMessage"
              // styling the position of the message box according the user
              style={
                props.MessageInfo.sender === userProfileDetailStore.userID
                  ? {
                      backgroundColor: "var(--primary-color-point-7)",
                    }
                  : {}
              }
            >
              <p
                style={
                  props.MessageInfo.sender === userProfileDetailStore.userID
                    ? {
                        color: "white",
                      }
                    : {}
                }
              >
                {props.MessageInfo.content}
              </p>
            </div>
          </div>
        </>
      );
    };
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
    const sendMessage = async () => {
      // sending message to user
      try {
        if (userMessageField === "") {
          return;
        }
        const resBody = {
          sender: userProfileDetailStore.userID,
          receiver: props.InternalMessageInfo.messageTo,
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
                receiver: resBody.receiver,
              })
            );
          }
        });
      } catch (err) {
        // console.log(err);
      }
    };

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
            <h3>{props.InternalMessageInfo.messageTo}</h3>
            <CloseIcon
              className="MessageBox_InnerMessage_Upper_Part_Close_Button"
              style={{ width: "1.2rem", height: "1.2rem" }}
              onClick={() => {
                dispatch(mainPageMessageInnerViewOnOff(false));
              }}
            />
          </div>
          <div className="MessageBox_InnerMessage_Message_Container">
            {showLoadingSpinner ? (
              <>
                <div style={loadingContainerSpinnerStyle}>
                  <div style={loadingSpinnerStyle}></div>
                </div>
              </>
            ) : (
              currentMessageStore.message.map((message) => {
                return (
                  <UserSingleMessageBox
                    MessageInfo={message}
                    picture={currentMessageStore.receiverPicture}
                    key={message._id}
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
  return (
    <>
      <div className="MessagePage_Container">
        <div className="MainPage_MessageBox_Container">
          {mainPageInnerMessageBoxOnOffState ? (
            <ReturnInnerUserMessageBox
              InternalMessageInfo={{
                messageTo: currentMessageStore.messageTo,
                picture: currentMessageStore.receiverPicture,
              }}
            />
          ) : (
            <ReturnMessageListBox />
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
