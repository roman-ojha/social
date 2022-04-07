import React from "react";
import "../styles/pages/page404.css";
import Img404 from "../assets/svg/404_not_found.svg";

const Page404 = () => {
  return (
    <>
      <div className="page404">
        <div className="page404_Title_Button_Container">
          <div className="page404_Title">
            <h1>404</h1>
          </div>
          <button type="submit">Home</button>
        </div>
        {/* <img src={Img404} alt="404" /> */}
      </div>
    </>
  );
};

export default Page404;
