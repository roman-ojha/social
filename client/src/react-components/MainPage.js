import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainPageSideBar from "./MainPageSideBar";
import MainPageStory from "./MainPageStory";
import MainPageMsgAndNtfBar from "./MainPageMsgAndNtfBar";
import MainPageRightSideComp from "./MainPageRightSideComp";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch("/u", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const userData = await res.json();
        console.log(userData);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        history.push("/signin");
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="MainPage_Container">
        <MainPageSideBar />
        <MainPageStory />
        <MainPageMsgAndNtfBar />
        <MainPageRightSideComp />
      </div>
    </>
  );
};

export default HomePage;
