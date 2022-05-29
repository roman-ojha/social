import React, { useEffect } from "react";
import MessageBox from "./MessageBox/MessageBox";
import UserSuggestion from "./UserSuggestionComp/UserSuggestion";
import FollowedBy from "./FollowedBy";
import SponsoredBy from "./SponsoredBy";
import { useDispatch, useSelector } from "react-redux";
import { openRightPartDrawer } from "../services/redux-actions";
import MainPageMsgAndNtfBar from "./MainPageMsgAndNtfBar";
import "../styles/components/mainPageRightSideComp.css";
import NotificationBox from "./NotificationBox";
import MoreProfileBox from "./MoreProfileBox";

const MainPageRightSideComp = () => {
  const dispatch = useDispatch();
  const rightPartDrawerState = useSelector(
    (state) => state.rightPartDrawerReducer
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
        <aside className="MainPage_Rignt_Side_Component_Container ">
          <MainPageMsgAndNtfBar />
          <NotificationBox />
          <MoreProfileBox />
          <MessageBox />
          <UserSuggestion />
          <FollowedBy />
          <SponsoredBy />
        </aside>
      </div>
    </>
  );
};

export default MainPageRightSideComp;
