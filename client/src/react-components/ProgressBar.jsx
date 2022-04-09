import React, { useEffect } from "react";

const ProgressBar = () => {
  const updateIntervalIn = 500;
  const ProgressBarStyle = {
    width: "0%",
    height: "3px",
    position: "absolute",
    backgroundColor: "var(--primary-color)",
    zIndex: "3",
    transitionDuration: `${updateIntervalIn}ms`,
  };
  useEffect(() => {
    const progressBar = document.querySelector(".ProgressBar");
    let previousWidth = 30;
    let incrementInterval = 30;
    const initialUpdateInterval = setTimeout(() => {
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
      clearTimeout(initialUpdateInterval);
    };
  }, []);
  return (
    <>
      <div className="ProgressBar" style={ProgressBarStyle}></div>
    </>
  );
};

export default ProgressBar;
