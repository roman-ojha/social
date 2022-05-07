import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainPageSideBar from "../MainPageSideBar";
import MainPageStory from "../MainPageStoryComp/MainPageStory";
import MainPageRightSideComp from "../MainPageRightSideComp";
import CommentBox from "../CommentBox";
import ProgressBar from "../ProgressBar";
import RoutingUserPage from "../../routes/RoutingUserPage";

const ReturnMainPage = () => {
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  return (
    <>
      <ProgressBar />
      {commentBoxStore.openCommentBox ? <CommentBox /> : <></>}
      <MainPageSideBar />
      <MainPageStory />
      <RoutingUserPage />
      <MainPageRightSideComp />
    </>
  );
};

export default ReturnMainPage;
