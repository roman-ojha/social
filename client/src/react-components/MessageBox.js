import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { mainPageMessageViewOnOff } from "../redux-actions/index";
const MessageBox = () => {
  const mainPageMessageOnOffState = useSelector(
    (state) => state.changeMainPageMessageView
  );
  const messageOnOffDispatch = useDispatch();
  const UserMessage = () => {
    return (
      <>
        <div className="MaiPage_MessageBox_UserMessage_Container">
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
  if (mainPageMessageOnOffState === true) {
    return (
      <>
        <div className="MainPage_MessageBox_Container">
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
                messageOnOffDispatch(mainPageMessageViewOnOff());
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
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default MessageBox;
