import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainPageSideBar from "../../react-components/MainPageSideBar";
import MainPageStory from "../../react-components/MainPageStoryComp/MainPageStory";
import MainPageRightSideComp from "../../react-components/MainPageRightSideComp";
import CommentBox from "../../react-components/CommentBox";
import ProgressBar from "../../react-components/ProgressBar";
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
