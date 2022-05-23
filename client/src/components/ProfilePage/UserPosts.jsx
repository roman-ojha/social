import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import profileApi from "../../services/api/pages/profileApi";
import { toastError } from "../../services/toast";

const UserPosts = () => {
  const location = useLocation();
  const history = useHistory();
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

  const fetchUserPostData = async () => {
    try {
      const resPost = await profileApi.getUserPosts();
      const resPostData = await resPost.data;
      if (resPost.status === 200 && resPostData.success) {
        //
        console.log(resPostData);
      } else {
        toastError("Some this went wrong please try again later");
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      history.push("/u/home");
    }
  };

  useEffect(() => {
    if (
      location.pathname.includes(
        `/u/profile/${userProfileDetailStore.userID}/posts`
      )
    ) {
      fetchUserPostData();
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
