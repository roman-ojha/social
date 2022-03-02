import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import socket from "../services/socket";
import {
  mainPageMessageViewOnOff,
  currentUserMessageAction,
  mainPageMessageInnerViewOnOff,
  appendOnMessage,
} from "../redux-actions/index";
import { instance as axios } from "../services/axios";

const MessageBox = () => {
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const mainPageInnerMessageBoxOnOffState = useSelector(
    (state) => state.mainPageInnerMessageBoxOnOff
  );
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
      console.log(props.messageInfo.messageTo);
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
            <p>{props.messageInfo.message[0].content}</p>
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

            {userProfileDetailStore.messages.map((messageInfo) => {
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
        <div className="MainPage_MessageBox_See_More_Message_Container">
          <NavLink
            to="/u/message"
            onClick={() => {
              dispatch(mainPageMessageViewOnOff());
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
  useEffect(() => {
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
    const appendMessage = (data) => {
      // dispatch(appendOnCurrentUserMessage(data));
      // channel.unbind(null, func);
    };
    const sendMessage = async () => {
      // sending message to user
      try {
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
          }
        });
      } catch (err) {
        console.log(err);
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
              <EmojiEmotionsIcon
                className="MessageBox_LowerPart_InputField_Buttons"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <input
                type="text"
                value={userMessageField}
                autoFocus
                onChange={(e) => {
                  // dispatch(userMessageFieldAction(e.target.value));
                  setUserMessageField(e.target.value);
                }}
              />
              <PhotoLibraryIcon
                className="MessageBox_LowerPart_InputField_Buttons"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <SendIcon
                className="MessageBox_LowerPart_InputField_Buttons"
                style={{ width: "1.5rem", height: "1.5rem" }}
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  if (mainPageMessageOnOffState === true) {
    return (
      <>
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
      </>
    );
  } else {
    return <></>;
  }
};

export default MessageBox;
