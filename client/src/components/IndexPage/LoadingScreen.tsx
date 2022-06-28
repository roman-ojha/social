import React from "react";
import AppIcon from "../../assets/icons/Social_Icon.ico";
import constant from "../../constant/constant";

const LoadingScreen = (): JSX.Element => {
  return (
    <>
      <div className="LoadingScreen_Page_Container">
        <h1 className="LoadingScreen_Title">
          Welcome To {constant.applicationName}
        </h1>
        <div className="LoadingScreen_Container">
          <img className="LoadingScreen_App_Icon" src={AppIcon} alt="App" />
          <div className="LoadingScreen_Loading_Div">
            <div className="LoadingScreen_Loading_Left_Part"></div>
            <div className="LoadingScreen_Loading_Right_Part"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
