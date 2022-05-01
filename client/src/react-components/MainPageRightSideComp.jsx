import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import UserSuggestion from "./UserSuggestion";
import FollowedBy from "./FollowedBy";
import SponsoredBy from "./SponsoredBy";
import { useDispatch, useSelector } from "react-redux";
import { openRightPartDrawer } from "../redux-actions";
import MainPageMsgAndNtfBar from "./MainPageMsgAndNtfBar";
import "../styles/react-components/mainPageRightSideComp.css";
import NotificationBox from "./NotificationBox";
import MoreProfileBox from "./MoreProfileBox";
// import "../styles/react-components/mainPageMsgAndNtfBar.css";

const MainPageRightSideComp = () => {
  const dispatch = useDispatch();
  const rightPartDrawerState = useSelector(
    (state) => state.rightPartDrawerReducer
  );
  const notificationBoxState = useSelector((state) => state.notificationBox);
  const moreProfileBoxState = useSelector(
    (state) => state.moreProfileBoxReducer
  );
  useEffect(() => {
    document
      .getElementsByClassName("RightPart_Drawer_Container")[0]
      .addEventListener("click", (e) => {
        if (
          !document
            .getElementsByClassName(
              "MainPage_Rignt_Side_Component_Container"
            )[0]
            .contains(e.target)
        ) {
          dispatch(openRightPartDrawer(false));
          document.getElementById("MainPage_Logo").style =
            "visibility:visible;position:static";
          document.querySelector(
            ".MainPage_SideBar_Search_Outline"
          ).style.width = "65%";
          document.querySelector(".MainPage_SideBar_Search_Back_Icon").style =
            "visibility: hidden;";
          document.querySelector(".MainPage_SideBar_Search_Icon").style =
            "visibility:visible;position:static;";
          document.querySelector(".MainPage_SideBar_Search_Input_Field").style =
            "width:65%";
          document.querySelector(".MainPage_SideBar_Search_Input_Field").value =
            "";
        }
      });
  });

  useEffect(() => {
    if (rightPartDrawerState) {
      document
        .getElementsByClassName("RightPart_Drawer_Container")[0]
        .classList.add("Open_RightPart_Drawer");
      document
        .getElementsByClassName("RightPart_Drawer_Container")[0]
        .classList.remove("Close_RightPart_Drawer");
    } else {
      document
        .getElementsByClassName("RightPart_Drawer_Container")[0]
        .classList.remove("Open_RightPart_Drawer");
      document
        .getElementsByClassName("RightPart_Drawer_Container")[0]
        .classList.add("Close_RightPart_Drawer");
    }
  }, [rightPartDrawerState]);

  return (
    <>
      <div className="RightPart_Drawer_Container Close_RightPart_Drawer">
        <div className="MainPage_Rignt_Side_Component_Container ">
          <MainPageMsgAndNtfBar />
          {notificationBoxState ? <NotificationBox /> : <></>}
          {moreProfileBoxState ? <MoreProfileBox /> : <></>}
          <MessageBox />
          <UserSuggestion />
          <FollowedBy />
          <SponsoredBy />
        </div>
      </div>
    </>
  );
};

export default MainPageRightSideComp;
