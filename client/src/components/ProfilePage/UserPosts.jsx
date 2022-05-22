import React from "react";
import UserPostFeed from "../UserPostFeed";
import { useSelector } from "react-redux";

const UserPosts = () => {
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  return (
    <div>
      {profilePageData.posts.map((value, index) => (
        <UserPostFeed
          userMainInformation={{
            // store searched user essintal information
            name: profilePageData.name,
            email: profilePageData.email,
            picture: profilePageData.picture,
            userID: profilePageData.userID,
          }}
          userFeedData={value}
          key={index}
        />
      ))}
    </div>
  );
};

export default UserPosts;
