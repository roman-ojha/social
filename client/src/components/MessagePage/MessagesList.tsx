import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
// import { messageListAction } from "../../services/redux-actions/index";
import { toastError } from "../../services/toast";
import messageApi from "../../services/api/global/message";
import MessageListSingleMessage from "./MessagesListSingleMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";

const MessagesList = (): JSX.Element => {
  const dispatch = useDispatch();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const messageList = useSelector(
    (state: AppState) => state.messageListReducer
  );
  const { messageListAction } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const getUserMessages = async (): Promise<void> => {
      try {
        setShowLoadingSpinner(true);
        const resMessage = await messageApi.getUserMessages();
        const resMessageData = await resMessage.data;
        if (resMessage.status === 200 && resMessageData.success) {
          messageListAction(resMessageData.messages);
        } else {
          toastError("Error While fetching Messages");
        }
        setShowLoadingSpinner(false);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
        setShowLoadingSpinner(false);
      }
    };
    getUserMessages();
  }, [dispatch]);

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
                return (
                  <MessageListSingleMessage
                    messageInfo={messageInfo}
                    key={index}
                  />
                );
              } else {
                return "";
              }
            })
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesList;
