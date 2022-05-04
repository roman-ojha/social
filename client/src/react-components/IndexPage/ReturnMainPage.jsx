import React from "react";
import { useSelector } from "react-redux";
import MainPageSideBar from "../../react-components/MainPageSideBar";
import MainPageStory from "../../react-components/MainPageStory";
import MainPageRightSideComp from "../../react-components/MainPageRightSideComp";
import CommentBox from "../../react-components/CommentBox";
import ProgressBar from "../../react-components/ProgressBar";
import RoutingMainPage from "../../routes/RoutingMainPage";

const ReturnMainPage = () => {
  const progressBarState = useSelector((state) => state.progressBarReducer);
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  return (
    <>
      {progressBarState.showProgressBar ? <ProgressBar /> : <></>}
      {commentBoxStore.openCommentBox ? <CommentBox /> : <></>}
      <MainPageSideBar />
      <MainPageStory />
      <RoutingMainPage />
      <MainPageRightSideComp />
    </>
  );
};

export default ReturnMainPage;
