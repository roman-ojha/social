import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { progressBarAction } from "../redux-actions";

const ProgressBar = () => {
  const updateIntervalIn = 500;
  const ProgressBarStyle = {
    width: "0%",
    height: "3px",
    position: "absolute",
    backgroundColor: "var(--primary-color)",
    zIndex: "3",
    transitionDuration: `2s`,
  };
  const progressBarState = useSelector((state) => state.progressBarReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const progressBar = document.querySelector(".ProgressBar");
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
      let previousWidth = 30;
      let incrementInterval = 30;
      const initialUpdateTimeOut = setTimeout(() => {
        progressBar.style.width = `${previousWidth}%`;
      }, 100);
      const updateProgressBar = () => {
        incrementInterval = incrementInterval / 1.5;
        previousWidth = previousWidth + incrementInterval;
        progressBar.style.width = `${previousWidth}%`;
      };
      const updateProgressInterval = setInterval(
        updateProgressBar,
        updateIntervalIn
      );
      return () => {
        clearInterval(updateProgressInterval);
        clearTimeout(initialUpdateTimeOut);
      };
    }
  }, []);

  useEffect(() => {
    if (progressBarState.isCompleted) {
      const progressBar = document.querySelector(".ProgressBar");
      progressBar.style.width = "100%";
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
  }, [progressBarState.isCompleted]);
  return (
    <>
      <div className="ProgressBar" style={ProgressBarStyle}></div>
    </>
  );
};

export default ProgressBar;
