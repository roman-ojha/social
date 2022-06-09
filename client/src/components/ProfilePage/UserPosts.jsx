import React, { useEffect } from "react";
import PostBox from "../PostBox/PostBox";
import { useSelector, useDispatch } from "react-redux";
import profileApi from "../../services/api/pages/profileApi";
import { toastError } from "../../services/toast";
import {
  setRootUserProfileDataState,
  setRootUserPostData,
  profilePageDataAction,
} from "../../services/redux-actions";

const UserPosts = (props) => {
  const dispatch = useDispatch();
  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  useEffect(() => {
    const getRootUserProfilePostData = async () => {
      try {
        const resPost = await profileApi.getUserPosts();
        const resPostData = resPost.data;
        if (resPost.status === 200 && resPostData.success) {
          dispatch(
            setRootUserPostData({
              fetchedPostData: true,
              posts: resPostData.posts,
            })
          );
          dispatch(
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            })
          );
          const userObj = {
            ...userProfileDetailStore,
            isRootUserFollowed: false,
            posts: resPostData.posts,
          };
          dispatch(profilePageDataAction(userObj));
        }
      } catch (err) {
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
      props.profilePageData.userID === userProfileDetailStore.userID
    ) {
      getRootUserProfilePostData();
    }
  }, [
    dispatch,
    props.profilePageData.userID,
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
        {props.profilePageData.userID === userProfileDetailStore.userID &&
        rootUserProfileDataState.fetchedRootUserProfileData === false ? (
          // if profile page is of rootUser and post data had not been fetched then we will run loading spinner
          <>
            <div style={loadingContainerSpinnerStyle}>
              <div style={loadingSpinnerStyle}></div>
            </div>
          </>
        ) : (
          props.profilePageData.posts.map((value, index) => (
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
          ))
        )}
      </>
    </>
  );
};

export default UserPosts;
