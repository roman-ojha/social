import React from "react";
import { useSelector } from "react-redux";
import admin from "../../constant/admin";
import DefaultSocialPost from "../DefaultSocialPost";
import PostBox from "../PostBox/PostBox";
const DisplayFollowedUserPost = () => {
  const followedUserPostDataStore = useSelector(
    (state) => state.setFollowedUserPostDataReducer
  );
  // Displaying Followed User Post
  return (
    <>
      {followedUserPostDataStore.map((user, key) => {
        const postElement = user.posts.map((post) => {
          return (
            <PostBox
              key={post.id}
              userMainInformation={user}
              userFeedData={post}
              user={user.id} // required: user = id of the user who post this
            />
          );
        });
        if (
          postElement.length === 1 &&
          postElement[0].props.userMainInformation.userID === admin.adminUserID
        ) {
          return [<DefaultSocialPost key={key} />, ...postElement];
        } else if (postElement.length > 0) {
          return postElement;
        } else {
          return <DefaultSocialPost key={key} />;
        }
      })}
    </>
  );
};

export default DisplayFollowedUserPost;
