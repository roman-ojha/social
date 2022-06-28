import React from "react";
import SideBar from "../SideBar";
import MainPageStory from "../MainPageStoryComp/MainPageStory";
import MainPageRightSideComp from "../MainPageRightSideComp";
import CommentBox from "../CommentBox";
import ProgressBar from "../ProgressBar";
import RoutingUserPage from "../../routes/RoutingUserPage";

const ReturnMainPage = (): JSX.Element => {
  return (
    <>
      <ProgressBar />
      <CommentBox />
      <SideBar />
      <MainPageStory />
      <RoutingUserPage />
      <MainPageRightSideComp />
    </>
  );
};

export default ReturnMainPage;
