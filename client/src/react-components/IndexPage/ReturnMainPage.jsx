import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainPageSideBar from "../../react-components/MainPageSideBar";
import MainPageStory from "../../react-components/MainPageStory";
import MainPageRightSideComp from "../../react-components/MainPageRightSideComp";
import CommentBox from "../../react-components/CommentBox";
import ProgressBar from "../../react-components/ProgressBar";
import RoutingMainPage from "../../routes/RoutingMainPage";

const ReturnMainPage = () => {
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  console.log("hello");
  return (
    <>
      <ProgressBar />
      {commentBoxStore.openCommentBox ? <CommentBox /> : <></>}
      <MainPageSideBar />
      <MainPageStory />
      <RoutingMainPage />
      <MainPageRightSideComp />
    </>
  );
};

export default ReturnMainPage;
