import React from "react";
import UserPostFeed from "../UserPostFeed";

const UserPosts = (props) => {
  return (
    <>
      <>
        {props.profilePageData.posts.map((value, index) => (
          <UserPostFeed
            userMainInformation={{
              // store searched user essintal information
              name: props.profilePageData.name,
              email: props.profilePageData.email,
              picture: props.profilePageData.picture,
              userID: props.profilePageData.userID,
              id: props.profilePageData.id,
            }}
            userFeedData={value}
            key={index}
          />
        ))}
      </>
    </>
  );
};

export default UserPosts;
