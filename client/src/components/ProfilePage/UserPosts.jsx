import React, { useEffect } from "react";
import PostBox from "../PostBox/PostBox";
import { useSelector } from "react-redux";

const UserPosts = (props) => {
  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  useEffect(() => {
    if (
      rootUserProfileDataState.getRootUserProfileData &&
      !rootUserProfileDataState.fetchedRootUserProfileData &&
      props.profilePageData.userID === userProfileDetailStore.userID
    ) {
      // console.log("need to fetch");
    }
  }, [rootUserProfileDataState]);

  return (
    <>
      <>
        {props.profilePageData.posts.map((value, index) => (
          <PostBox
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
