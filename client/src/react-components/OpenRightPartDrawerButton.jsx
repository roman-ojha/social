import React from "react";
import { useMediaQuery } from "react-responsive";
import constant from "../constant/constant";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/react-components/rightPartDrawerOpenButton.css";

const OpenRightPartDrawerButton = () => {
  const dispatch = useDispatch();
  const sideBarDrawerState = useSelector((state) => state.sideBarDrawerReducer);
  return (
    <>
      {useMediaQuery({
        query: "(max-width:850px)",
      }) && sideBarDrawerState === false ? (
        <div className="RightPart_Drawer_Open_Icons">
          <Icon
            icon="ic:outline-navigate-next"
            className="RightPart_Drawer_Open_1st_Icon"
          />
          <Icon
            icon="ic:outline-navigate-next"
            className="RightPart_Drawer_Open_2nd_Icon"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OpenRightPartDrawerButton;
