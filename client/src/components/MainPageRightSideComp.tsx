import React, { useEffect } from "react";
import MessageBox from "./MessageBox/MessageBox";
import UserSuggestion from "./UserSuggestionComp/UserSuggestion";
import FollowedBy from "./FollowedBy";
import SponsoredBy from "./SponsoredBy";
import { useDispatch, useSelector } from "react-redux";
import MainPageMsgAndNtfBar from "./MainPageMsgAndNtfBar";
import "../styles/components/mainPageRightSideComp.css";
import NotificationBox from "./NotificationBox";
import MoreProfileBox from "./MoreProfileBox";
import { actionCreators, AppState } from "../services/redux";
import { bindActionCreators } from "redux";

const MainPageRightSideComp = (): JSX.Element => {
  const dispatch = useDispatch();
  const rightPartDrawerState = useSelector(
    (state: AppState) => state.rightPartDrawerReducer
  );
  const { openRightPartDrawer } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    document
      .getElementsByClassName("RightPart_Drawer_Container")[0]
      .addEventListener("click", (e) => {
        if (
          !document
            .getElementsByClassName(
              "MainPage_Rignt_Side_Component_Container"
            )[0]
            .contains(e.target as Node)
        ) {
          openRightPartDrawer(false);
          document
            .getElementById("MainPage_Logo")!
            .setAttribute("style", "visibility:visible;position:static");
          document
            .querySelector(".MainPage_SideBar_Search_Outline")
            ?.setAttribute("style", "width:65%");
          document
            .querySelector(".MainPage_SideBar_Search_Back_Icon")
            ?.setAttribute("style", "visibility: hidden;");
          document
            .querySelector(".MainPage_SideBar_Search_Icon")
            ?.setAttribute("style", "visibility:visible;position:static;");
          document
            .querySelector(".MainPage_SideBar_Search_Input_Field")
            ?.setAttribute("style", "width:65%");
          document
            .querySelector(".MainPage_SideBar_Search_Input_Field")
            ?.setAttribute("value", "");
        }
      });
  }, []);

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
