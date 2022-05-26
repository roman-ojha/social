import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import socket from "../services/socket";
import { Helmet } from "react-helmet";
import {
  currentUserMessageAction,
  mainPageMessageInnerViewOnOff,
  appendOnMessage,
  appendMessageOnMessageListAction,
  messageListAction,
  mainPageMessageViewOnOff,
} from "../services/redux-actions/index";
import { instance as axios } from "../services/axios";
import "../styles/components/messageBox.css";
import "../styles/pages/MessagePage.css";
import { Icon } from "@iconify/react";
import { toastError } from "../services/toast";
import messageApi from "../services/api/global/message";
import InnerUserMessage from "../components/MessagePage/InnerUserMessage";

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

  const UserMessage = (props) => {
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
        setShowLoadingSpinner(true);
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
          setShowLoadingSpinner(false);
          // if we are inside the user message then we have to join room through socket
          // NOTE: this is just for temporary purposes
          socket.emit("join-room", resData.roomID, (resMessage) => {
            console.log(resMessage);
          });
        }
      } catch (err) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
        setShowLoadingSpinner(false);
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
            {showLoadingSpinner ? (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={loadingContainerSpinnerStyle}>
                    <div style={loadingSpinnerStyle}></div>
                  </div>
                </div>
              </>
            ) : (
              messageList.map((messageInfo, index) => {
                if (messageInfo.message.length !== 0) {
                  return <UserMessage messageInfo={messageInfo} key={index} />;
                }
              })
            )}
          </div>
        </div>
      </>
    );
  };

  const getUserMessages = async () => {
    try {
      setShowLoadingSpinner(true);
      const resMessage = await messageApi.getUserMessages();
      const resMessageData = await resMessage.data;
      if (resMessage.status === 200 && resMessageData.success) {
        dispatch(messageListAction(resMessageData.messages));
      } else {
        toastError("Error While fetching Messages");
      }
      setShowLoadingSpinner(false);
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      setShowLoadingSpinner(false);
    }
  };

  useEffect(() => {
    dispatch(mainPageMessageViewOnOff(false));
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
    getUserMessages();
  }, []);
  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>
      <div className="MessagePage_Container">
        <div className="MainPage_MessageBox_Container">
          {mainPageInnerMessageBoxOnOffState ? (
            <InnerUserMessage
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
      </div>
    </>
  );
};

export default Message;
