import React from "react";
import "../styles/pages/page404.css";
import { useHistory } from "react-router-dom";

const Page404 = (): JSX.Element => {
  const history = useHistory();
  return (
    <>
      <main className="page404">
        <div className="page404_Title_Button_Container">
          <div className="page404_Title">
            <h1>404</h1>
          </div>
          <button
            onClick={() => {
              history.push("/u");
            }}
          >
            Home
          </button>
        </div>
        {/* <img src={Img404} alt="404" /> */}
      </main>
    </>
  );
};

export default Page404;
