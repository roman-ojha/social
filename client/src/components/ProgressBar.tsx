import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { hideProgressBar } from "../services/redux-actions";
import { AppState, actionCreators } from "../services/redux";
import { bindActionCreators } from "redux";

const ProgressBar = (): JSX.Element => {
  const updateIntervalIn = 100;
  const dispatch = useDispatch();
  const progressBarState = useSelector(
    (state: AppState) => state.progressBarReducer
  );
  const { hideProgressBar } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (progressBarState.showProgressBar) {
      const progressBar = document.getElementsByClassName(
        "ProgressBar"
      )[0] as HTMLDivElement;
      // if (
      //   progressBarState.isCompleted === true &&
      //   progressBarState.showProgressBar === false
      // ) {
      //   // hideProgressBar();
      // }
      if (!progressBarState.isCompleted) {
        let previousWidth = 15;
        let incrementInterval = 30;
        const updateProgressBar = () => {
          if (previousWidth <= 85) {
            incrementInterval = incrementInterval / 1.4;
            previousWidth = previousWidth + incrementInterval;
            progressBar.style.width = `${previousWidth}%`;
          } else if (previousWidth <= 100) {
            incrementInterval = incrementInterval / 1.9;
            previousWidth = previousWidth + incrementInterval;
            progressBar.style.width = `${previousWidth}%`;
          }
        };
        const updateProgressInterval = setInterval(
          updateProgressBar,
          updateIntervalIn
        );
        return () => {
          clearInterval(updateProgressInterval);
        };
      }

      if (progressBarState.isCompleted) {
        const progressBar = document.getElementsByClassName(
          "ProgressBar"
        )[0] as HTMLDivElement;
        progressBar.style.width = "100%";
        progressBar.style.transitionDuration = "500ms";
        const progressCompleteTimeOut = setTimeout(() => {
          hideProgressBar();
        }, 500);
        return () => {
          clearTimeout(progressCompleteTimeOut);
        };
      }
    }
  }, [
    progressBarState.showProgressBar,
    progressBarState.isCompleted,
    progressBarState,
    dispatch,
  ]);

  return (
    <>
      {progressBarState.showProgressBar ? (
        <div
          className="ProgressBar"
          style={{
            width: "0%",
            height: "3px",
            position: "fixed",
            backgroundColor: "var(--primary-color)",
            top: "0px",
            zIndex: "10",
            transitionDuration: `1s`,
          }}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProgressBar;
