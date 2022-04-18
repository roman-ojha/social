import React from "react";
import { useMediaQuery } from "react-responsive";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/react-components/rightPartDrawerOpenButton.css";
import { openRightPartDrawer } from "../redux-actions";

const OpenRightPartDrawerButton = () => {
  const dispatch = useDispatch();
  const rightPartDrawerState = useSelector(
    (state) => state.rightPartDrawerReducer
  );
  return (
    <>
      {useMediaQuery({
        query: "(max-width:850px)",
      }) && rightPartDrawerState === false ? (
        <div
          className="RightPart_Drawer_Open_Icons"
          onClick={() => {
            dispatch(openRightPartDrawer(true));
          }}
        >
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
