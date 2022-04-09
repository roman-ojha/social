import React from "react";

const ProgressBar = () => {
  const ProgressBarStyle = {
    width: "100%",
    height: "3px",
    position: "absolute",
    backgroundColor: "var(--primary-color)",
    zIndex: "3",
  };
  return (
    <>
      <div style={ProgressBarStyle}></div>
    </>
  );
};

export default ProgressBar;
