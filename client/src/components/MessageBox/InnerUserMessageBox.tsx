import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
// import { mainPageMessageInnerViewOnOff } from "../../services/redux-actions/index";
import "../../styles/components/messageBox.css";
import SingleMessage from "./SingleMessage";
import SendMessageInputField from "./SendMessageInputField";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { CurrentUserMessageState } from "../../services/redux/components/messageBox/currentUserMessage/types";
import useRouteToProfilePage from "../../hooks/useRouteToProfilePage";

interface InnerMessageBoxProps {
  InternalMessageInfo: {
    messageToUserId: CurrentUserMessageState["messageToUserId"];
    messageToId: CurrentUserMessageState["messageToId"];
    picture: CurrentUserMessageState["receiverPicture"];
  };
}

const InnerMessageBox: React.FC<InnerMessageBoxProps> = ({
  InternalMessageInfo,
}): JSX.Element => {
  const dispatch = useDispatch();
  const routeToProfilePage = useRouteToProfilePage();
  const currentMessageStore = useSelector(
    (state: AppState) => state.setCurrentUserMessageReducer
  );
  const { mainPageMessageInnerViewOnOff } = bindActionCreators(
    actionCreators,
    dispatch
  );

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

  return (
    <>
      <div className="MessageBox_InnerMessage_Container">
        <div className="MessageBox_InnerMessage_Upper_Part_Container">
          <img
            src={
              InternalMessageInfo.picture
                ? InternalMessageInfo.picture
                : User_Profile_Icon
            }
            alt="user"
            onClick={async () => {
              await routeToProfilePage({
                userID: InternalMessageInfo.messageToUserId,
                from: "messageBox",
              });
            }}
          />
          <h3
            onClick={async () => {
              await routeToProfilePage({
                userID: InternalMessageInfo.messageToUserId,
                from: "messageBox",
              });
            }}
          >
            {InternalMessageInfo.messageToUserId}
          </h3>
          <CloseIcon
            className="MessageBox_InnerMessage_Upper_Part_Close_Button"
            style={{ width: "1.2rem", height: "1.2rem" }}
            onClick={() => {
              mainPageMessageInnerViewOnOff(false);
            }}
          />
        </div>
        <div className="MessageBox_InnerMessage_Message_Container">
          {currentMessageStore.fetchedInnerMessage === false ? (
            <div style={loadingContainerSpinnerStyle}>
              <div style={loadingSpinnerStyle}></div>
            </div>
          ) : (
            currentMessageStore.message.map((message, index) => {
              return (
                <SingleMessage
                  MessageInfo={message}
                  messageToUserId={InternalMessageInfo.messageToUserId}
                  picture={currentMessageStore.receiverPicture}
                  key={index}
                />
              );
            })
          )}
        </div>
        <SendMessageInputField
          messageToUserId={InternalMessageInfo.messageToUserId}
          messageToId={InternalMessageInfo.messageToId}
          receiverPicture={InternalMessageInfo.picture}
        />
      </div>
    </>
  );
};

export default InnerMessageBox;
