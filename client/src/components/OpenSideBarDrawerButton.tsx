import React from "react";
import { useMediaQuery } from "react-responsive";
// import { openSideBarDrawer } from "../services/redux-actions";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import constant from "../constant/constant";
import "../styles/components/sideBarDrawerButton.css";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../services/redux";

const OpenSideBarDrawerButton = () => {
  const dispatch = useDispatch();
  const sideBarDrawerState = useSelector(
    (state: AppState) => state.sideBarDrawerReducer
  );
  const { openSideBarDrawer } = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      {useMediaQuery({
        query: `(max-width:${constant.mediaQueryRes.screen1024}px)`,
      }) && sideBarDrawerState === false ? (
        <div
          className="SideBar_Drawer_Open_Icons"
          onClick={() => {
            openSideBarDrawer(true);
            // console.log("hello");
          }}
        >
          <Icon
            icon="ic:outline-navigate-next"
            className="SideBar_Drawer_Open_1st_Icon"
          />
          <Icon
            icon="ic:outline-navigate-next"
            className="SideBar_Drawer_Open_2nd_Icon"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OpenSideBarDrawerButton;
