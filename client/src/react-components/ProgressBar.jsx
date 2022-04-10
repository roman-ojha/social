import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { progressBarAction } from "../redux-actions";

const ProgressBar = () => {
  const updateIntervalIn = 100;
  const ProgressBarStyle = {
    width: "0%",
    height: "3px",
    position: "absolute",
    backgroundColor: "var(--primary-color)",
    zIndex: "3",
    transitionDuration: `1s`,
  };
  const progressBarState = useSelector((state) => state.progressBarReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const progressBar = document.getElementsByClassName("ProgressBar")[0];
    if (
      progressBarState.isCompleted === true &&
      progressBarState.showProgressBar === false
    ) {
      dispatch(
        progressBarState({
          showProgressBar: false,
          isCompleted: false,
        })
      );
    }
    if (!progressBarState.isCompleted) {
      let previousWidth = 15;
      let incrementInterval = 30;
      const updateProgressBar = () => {
        if (previousWidth <= 85) {
          // console.log("less then 85");
          incrementInterval = incrementInterval / 1.4;
          previousWidth = previousWidth + incrementInterval;
          progressBar.style.width = `${previousWidth}%`;
        } else if (previousWidth <= 100) {
          // console.log("more then 85");
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
      const progressBar = document.getElementsByClassName("ProgressBar")[0];
      progressBar.style.width = "100%";
      progressBar.style.transitionDuration = "500ms";
      const progressCompleteTimeOut = setTimeout(() => {
        dispatch(
          progressBarAction({
            showProgressBar: false,
            isCompleted: false,
          })
        );
      }, 500);
      return () => {
        clearTimeout(progressCompleteTimeOut);
      };
    }
  }, [progressBarState.showProgressBar, progressBarState.isCompleted]);

  return (
    <>
      <div className="ProgressBar" style={ProgressBarStyle}></div>
    </>
  );
};

export default ProgressBar;
