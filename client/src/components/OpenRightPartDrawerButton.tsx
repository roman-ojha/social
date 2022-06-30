import React from "react";
import { useMediaQuery } from "react-responsive";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/components/rightPartDrawerOpenButton.css";
// import { openRightPartDrawer } from "../services/redux-actions";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../services/redux";

const OpenRightPartDrawerButton = () => {
  const dispatch = useDispatch();
  const rightPartDrawerState = useSelector(
    (state: AppState) => state.rightPartDrawerReducer
  );
  const { openRightPartDrawer } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      {useMediaQuery({
        query: "(max-width:850px)",
      }) && rightPartDrawerState === false ? (
        <div
          className="RightPart_Drawer_Open_Icons"
          onClick={() => {
            openRightPartDrawer(true);
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
