import React from "react";
import { useMediaQuery } from "react-responsive";
import { openSideBarDrawer } from "../services/redux-actions";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import constant from "../constant/constant";

const OpenSideBarDrawerButton = () => {
  const dispatch = useDispatch();
  const sideBarDrawerState = useSelector((state) => state.sideBarDrawerReducer);
  return (
    <>
      {useMediaQuery({
        query: `(max-width:${constant.mediaQueryRes.screen1024}px)`,
      }) && sideBarDrawerState === false ? (
        <div
          className="SideBar_Drawer_Open_Icons"
          onClick={() => {
            dispatch(openSideBarDrawer(true));
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
