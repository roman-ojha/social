import React, { useEffect } from "react";
import PostBox from "../PostBox/PostBox";
import { useSelector, useDispatch } from "react-redux";
import profileApi from "../../services/api/pages/profileApi";
import { toastError } from "../../services/toast";
// import {
//   setRootUserProfileDataState,
//   setRootUserPostData,
//   profilePageDataAction,
// } from "../../services/redux-actions";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../services/redux";
import { AxiosError } from "axios";
import { ProfilePageDataState } from "../../services/redux/pages/profile/profilePageData/types";

interface UserPostsProps {
  profilePageData: ProfilePageDataState;
}

const UserPosts: React.FC<UserPostsProps> = ({
  profilePageData,
}): JSX.Element => {
  const dispatch = useDispatch();
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const {
    setRootUserProfileDataState,
    setRootUserPostData,
    profilePageDataAction,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const getRootUserProfilePostData = async () => {
      try {
        const resPost = await profileApi.getUserPosts();
        const resPostData = resPost.data;
        if (resPost.status === 200 && resPostData.success) {
          setRootUserPostData({
            fetchedPostData: true,
            posts: resPostData.posts,
          });
          setRootUserProfileDataState({
            fetchedRootUserProfileData: true,
            getRootUserProfileData: false,
          });
          const userObj = {
            ...userProfileDetailStore,
            isRootUserFollowed: false,
            posts: resPostData.posts,
          };
          profilePageDataAction(userObj);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          if (err.response.data.success === false) {
            toastError(err.response.data.msg);
          }
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
      }
    };
    if (
      rootUserProfileDataState.getRootUserProfileData &&
      !rootUserProfileDataState.fetchedRootUserProfileData &&
      profilePageData.userID === userProfileDetailStore.userID
    ) {
      getRootUserProfilePostData();
    }
  }, [
    dispatch,
    profilePageData.userID,
    rootUserProfileDataState,
    userProfileDetailStore,
    userProfileDetailStore.userID,
  ]);

  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(199 199 199 / 22%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px",
  };
  const loadingSpinnerStyle = {
    border: "5px dotted #dddddd",
    borderTop: "5px dotted var(--primary-color-darker-5)",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    animation: "loadingSpinner 1s linear infinite",
  };

  return (
    <>
      <>
        {profilePageData.userID === userProfileDetailStore.userID &&
        rootUserProfileDataState.fetchedRootUserProfileData === false ? (
          // if profile page is of rootUser and post data had not been fetched then we will run loading spinner
          <>
            <div style={loadingContainerSpinnerStyle}>
              <div style={loadingSpinnerStyle}></div>
            </div>
          </>
        ) : (
          profilePageData.posts.map((value, index) => (
            <PostBox
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
          ))
        )}
      </>
    </>
  );
};

export default UserPosts;
