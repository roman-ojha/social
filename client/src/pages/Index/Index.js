import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/pages/Index.css";
import "../../styles/pages/page404.css";
import LoadingScreen from "./LoadingScreen";
import ReturnMainPage from "./ReturnMainPage";
import getUserData from "./functions/getUserData";

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [renderMainPage, setRenderMainPage] = useState(false);
  useEffect(() => {
    // fetching all user data and current user following user Post data
    getUserData(dispatch, history, setRenderMainPage);
  }, []);

  return (
    <>
      <div className="MainPage_Container">
        {renderMainPage ? <ReturnMainPage /> : <LoadingScreen />}
      </div>
    </>
  );
};

export default Index;
