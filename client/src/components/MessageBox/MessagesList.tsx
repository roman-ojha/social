import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
// import {
//   openRightPartDrawer,
//   mainPageMessageViewOnOff,
// } from "../../services/redux-actions/index";
import { useDispatch, useSelector } from "react-redux";
import MessagesListSingleMessage from "./MessagesListSingleMessage";
import { useMediaQuery } from "react-responsive";
import constant from "../../constant/constant";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";

const MessagesList = (): JSX.Element => {
  const dispatch = useDispatch();
  const messageList = useSelector(
    (state: AppState) => state.messageListReducer
  );
  const { openRightPartDrawer, mainPageMessageViewOnOff } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });

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
            } else {
              return "";
            }
          })}
        </div>
      </div>
      <div className="MainPage_MessageBox_See_More_Message_Container">
        <NavLink
          to="/u/message"
          onClick={() => {
            mainPageMessageViewOnOff(false);
            if (isMax850px) {
              openRightPartDrawer(false);
            }
          }}
        >
          See More Message
        </NavLink>
      </div>
    </>
  );
};

export default MessagesList;
