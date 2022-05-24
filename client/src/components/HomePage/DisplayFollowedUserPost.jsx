import React from "react";
import { useSelector } from "react-redux";
import PostBox from "../PostBox/PostBox";
const DisplayFollowedUserPost = () => {
  const followedUserPostDataStore = useSelector(
    (state) => state.setFollowedUserPostDataReducer
  );
  // Displaying Followed User Post
  let userPostFeedElement = [];
  if (followedUserPostDataStore.length !== 0) {
    let getMaxLengthOnce = 0;
    let lengthOfOneUserPostIndex;
    let maxLengthOfUserPost = followedUserPostDataStore[0].posts.length;
    for (let i = 0; i < maxLengthOfUserPost; i++) {
      for (let j = 0; j < followedUserPostDataStore.length; j++) {
        lengthOfOneUserPostIndex = followedUserPostDataStore[j].posts.length;
        if (followedUserPostDataStore[j].posts.length > maxLengthOfUserPost) {
          maxLengthOfUserPost = followedUserPostDataStore[j].posts.length;
        }
        if (followedUserPostDataStore[j].posts[i] === undefined) {
          continue;
        }
        userPostFeedElement.push(
          <PostBox
            key={followedUserPostDataStore[j].posts[i].id}
            userMainInformation={followedUserPostDataStore[j]}
            userFeedData={followedUserPostDataStore[j].posts[i]}
            user={followedUserPostDataStore[j].id} // required: user = id of the user who post this
          />
        );
      }
    }
    return <>{userPostFeedElement}</>;
  } else {
    return <></>;
  }
};

export default DisplayFollowedUserPost;
