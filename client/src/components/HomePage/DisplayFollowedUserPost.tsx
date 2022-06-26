import React from "react";
import { useSelector } from "react-redux";
import admin from "../../constant/admin";
import DefaultSocialPost from "../DefaultSocialPost";
import PostBox from "../PostBox/PostBox";
import { AppState } from "../../services/redux";

const DisplayFollowedUserPost = () => {
  const followedUserPostDataStore = useSelector(
    (state: AppState) => state.setFollowedUserPostDataReducer
  );
  return (
    <>
      {followedUserPostDataStore.length === 0 ? (
        <DefaultSocialPost />
      ) : (
        followedUserPostDataStore.map((user, key) => {
          const userCreateRandomPost = {
            ...user,
            posts: user.posts.sort((a, b) => Math.random() - 0.5),
          };
          const postElement = userCreateRandomPost.posts.map((post) => {
            return (
              <PostBox
                key={post.id}
                userMainInformation={user}
                userFeedData={post}
                user={user.id} // required: user = id of the user who post this
              />
            );
          });
          if (followedUserPostDataStore.length === 1 && postElement[0]) {
            // we have to check postElement[0] to solve the error
            if (
              postElement[0].props.userMainInformation.userID ===
              admin.adminUserID
            ) {
              return [<DefaultSocialPost key={key} />, ...postElement];
            } else {
              return postElement;
            }
          } else if (postElement.length > 0) {
            return postElement;
          } else {
            return <DefaultSocialPost key={key} />;
          }
        })
      )}
    </>
  );
};

export default DisplayFollowedUserPost;
