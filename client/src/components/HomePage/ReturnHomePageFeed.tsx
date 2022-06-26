import React from "react";
import DisplayFollowedUserPost from "./DisplayFollowedUserPost";
import PostBox from "../PostBox/PostBox";
import { useSelector } from "react-redux";
import { AppState } from "../../services/redux";

const ReturnHomePageFeed = () => {
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const userPostResponseDataState = useSelector(
    (state: AppState) => state.setUserPostResponseData
  );
  const userProfilePostStore = useSelector(
    (state: AppState) => state.setUserProfilePostReducer
  );
  return (
    <>
      <div className="HomePage_Feed_Main_Container">
        {/* Displaying current userPost filed */}
        {userPostResponseDataState.map((value, index) => {
          return (
            <PostBox
              key={index}
              // sending user main information
              userMainInformation={userProfileDetailStore}
              // sending user feed information information
              userFeedData={value}
            />
          );
        })}
        {/* Display only those user profile post which are post 5 min ago */}
        {userProfilePostStore.map((post, index) => {
          let currentDate = new Date();
          let date5MinutesAgo = new Date(currentDate);
          date5MinutesAgo.setMinutes(date5MinutesAgo.getMinutes() - 5);
          if (date5MinutesAgo.getTime() < new Date(post.date).getTime()) {
            return (
              <PostBox
                key={index}
                userMainInformation={userProfileDetailStore}
                userFeedData={post}
              />
            );
          } else {
            return <div key={index}></div>;
          }
        })}
        {/* Displaying current user Followed User post field filed */}
        <DisplayFollowedUserPost />
      </div>
    </>
  );
};

export default ReturnHomePageFeed;
