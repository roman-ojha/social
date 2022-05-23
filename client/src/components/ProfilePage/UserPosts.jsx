import React, { useEffect } from "react";
import UserPostFeed from "../UserPostFeed";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const UserPosts = () => {
  const location = useLocation();
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(199 199 199 / 22%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };
  const loadingSpinnerStyle = {
    border: "5px solid #dddddd",
    borderTop: "5px solid var(--primary-color-darker-5)",
    width: "1.8rem",
    height: "1.8rem",
    borderRadius: "50%",
    animation: "loadingSpinner 1s linear infinite",
  };

  const fetchUserPostData = async () => {};

  useEffect(() => {
    if (
      location.pathname.includes(
        `/u/profile/${userProfileDetailStore.userID}/posts`
      )
    ) {
      console.log("yes");
    } else {
      console.log("no");
    }
  }, [profilePageData]);

  return (
    <>
      {/* {profilePageData.posts.map((value, index) => (
        <UserPostFeed
          userMainInformation={{
            // store searched user essintal information
            name: profilePageData.name,
            email: profilePageData.email,
            picture: profilePageData.picture,
            userID: profilePageData.userID,
            id: profilePageData.id,
          }}
          userFeedData={value}
          key={index}
        />
      ))} */}
      <div style={loadingContainerSpinnerStyle}>
        <div style={loadingSpinnerStyle}></div>
      </div>
    </>
  );
};

export default UserPosts;
