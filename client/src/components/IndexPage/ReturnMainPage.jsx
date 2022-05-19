import React from "react";
import MainPageSideBar from "../SideBar/MainPageSideBar";
import MainPageStory from "../MainPageStoryComp/MainPageStory";
import MainPageRightSideComp from "../MainPageRightSideComp";
import CommentBox from "../CommentBox";
import ProgressBar from "../ProgressBar";
import RoutingUserPage from "../../routes/RoutingUserPage";

const ReturnMainPage = () => {
  return (
    <>
      <ProgressBar />
      <CommentBox />
      <MainPageSideBar />
      <MainPageStory />
      <RoutingUserPage />
      <MainPageRightSideComp />
    </>
  );
};

export default ReturnMainPage;
