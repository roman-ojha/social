import React from "react";
import "../styles/react-components/stories.css";
const Stories = () => {
  return (
    <>
      <div id="carousel-wrapper">
        <div id="menu">
          <div id="current-option">
            <span
              id="current-option-text1"
              data-previous-text=""
              data-next-text=""
            ></span>
            <span
              id="current-option-text2"
              data-previous-text=""
              data-next-text=""
            ></span>
          </div>
          <button id="previous-option"></button>
          <button id="next-option"></button>
        </div>
        <div id="image"></div>
      </div>
    </>
  );
};

export default Stories;
