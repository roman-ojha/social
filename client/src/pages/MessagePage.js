import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  mainPageMessageViewOnOff,
  currentUserMessageAction,
  mainPageMessageInnerViewOnOff,
} from "../redux-actions/index";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { Helmet } from "react-helmet";
import "../styles/pages/MessagePage.css";
import { NavLink } from "react-router-dom";
import { instance as axios } from "../services/axios";
import socket from "../services/socket";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";

const MessagePage = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(mainPageMessageViewOnOff(false));
  // }, []);
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

  return (
    <>
      <div className="MessagePage_Container">
        <Helmet>
          <title>Message</title>
        </Helmet>
        <div className="MessagePage_List_Of_Message_Container">
          <div
            className="MainPage_Scrollable_MessageBox_Container"
            style={{ height: "100%" }}
          >
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
        </div>
        <div className="MessagePage_Single_User_Message_Container"></div>
      </div>
    </>
  );
};

export default MessagePage;
