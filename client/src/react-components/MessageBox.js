import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import {
  mainPageMessageViewOnOff,
  currentUserMessageAction,
} from "../redux-actions/index";
const MessageBox = () => {
  const dispatch = useDispatch();
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const currentMessageStore = useSelector(
    (state) => state.setCurrentUserMessageReducer
  );
  const [showInnerMessage, setShowInnerMessage] = useState(false);
  const UserMessage = () => {
    return (
      <>
        <div
          className="MaiPage_MessageBox_UserMessage_Container"
          onClick={() => {
            setShowInnerMessage(true);
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            alt="user"
            className="MainPage_MessageBox_UserMessage_Picutre"
          />
          <div className="MainPage_MessageBox_UserMessage_Name_Message_Container">
            <h4>Jaklin Smith</h4>
            <p>Hello ke xa kbr</p>
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
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
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
  const ReturnInnerUserMessageBox = () => {
    const UserSingleMessageBox = () => {};
    return (
      <>
        <div className="MessageBox_InnerMessage_Container">
          <div className="MessageBox_InnerMessage_Upper_Part_Container">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              alt="user"
            />
            <h3>Mina Ojha</h3>
            <CloseIcon
              className="MessageBox_InnerMessage_Upper_Part_Close_Button"
              style={{ width: "1.2rem", height: "1.2rem" }}
              onClick={() => {
                setShowInnerMessage(false);
              }}
            />
          </div>
          <div className="MessageBox_InnerMessage_Message_Container"></div>
          <div className="MessageBox_LowerPart_InputField_Container">
            <div className="MessageBox_LowerPart_InputField_Inner_Container">
              <EmojiEmotionsIcon
                className="MessageBox_LowerPart_InputField_Buttons"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <input type="text" />
              <PhotoLibraryIcon
                className="MessageBox_LowerPart_InputField_Buttons"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <SendIcon
                className="MessageBox_LowerPart_InputField_Buttons"
                style={{ width: "1.5rem", height: "1.5rem" }}
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
          {showInnerMessage ? (
            <ReturnInnerUserMessageBox />
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
