import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { mainPageMessageViewOnOff } from "../../services/redux-actions/index";
import { useDispatch, useSelector } from "react-redux";
import MessagesListSingleMessage from "./MessagesListSingleMessage";

const MessagesList = () => {
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.messageListReducer);

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
              return (
                <MessagesListSingleMessage
                  messageInfo={messageInfo}
                  key={index}
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

export default MessagesList;
