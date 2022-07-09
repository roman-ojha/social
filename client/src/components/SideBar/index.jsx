import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/mainPageSideBar.css";
import LogoAndSearchBar from "./LogoAndSearchBar";
import Menu from "./Menu";
import Friends from "./Friends";
import Account from "./Account";
import { AppState, actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";

const MainPageSideBar = () => {
  const dispatch = useDispatch();
  const sideBarDrawerState = useSelector((state) => state.sideBarDrawerReducer);
  const [onSearchBar, setOnSearchBar] = useState(false);
  const { openSideBarDrawer } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    document
      .getElementsByClassName("SideBar_Drawer_Container")[0]
      .addEventListener("click", (e) => {
        if (
          !document
            .getElementsByClassName("MainPage_SideBar_Container")[0]
            .contains(e.target)
        ) {
          openSideBarDrawer(false);
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
          setOnSearchBar(false);
        }
      });
  }, [dispatch]);

  useEffect(() => {
    if (sideBarDrawerState) {
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.add("Open_SideBar_Drawer");
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.remove("Close_SideBar_Drawer");
    } else {
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.remove("Open_SideBar_Drawer");
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.add("Close_SideBar_Drawer");
    }
  }, [sideBarDrawerState]);
  return (
    <>
      <div className="SideBar_Drawer_Container Close_SideBar_Drawer">
        <aside className="MainPage_SideBar_Container">
          <LogoAndSearchBar
            onSearchBar={onSearchBar}
            setOnSearchBar={setOnSearchBar}
          />
          <Menu />
          <Friends />
          <Account />
        </aside>
      </div>
    </>
  );
};

export default MainPageSideBar;
