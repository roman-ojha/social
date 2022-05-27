import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { instance as axios } from "../services/axios";
import {
  profilePageDataAction,
  setRootUserProfileDataState,
  setRootUserPostData,
} from "../services/redux-actions/index";
import { useLocation, useHistory, useParams } from "react-router-dom";
import "../styles/pages/profilePage.css";
import { Helmet } from "react-helmet";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import { toastError } from "../services/toast";
import RoutingProfilePage from "../routes/RoutingProfilePage";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import UserInfo from "../components/ProfilePage/UserInfo";
import PageRoute from "../components/ProfilePage/PageRoute";

const Profile = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [fetchedAllData, setFetchedAllData] = useState(false);
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );

  useEffect(async () => {
    // if (params.userID === userProfileDetailStore.userID) {
    //   dispatch(profilePageDataAction(userProfileDetailStore));
    //   setFetchedAllData(true);
    // }
    if (
      profilePageData.userID != params.userID &&
      !rootUserProfileDataState.getRootUserProfileData
    ) {
      try {
        // fetching user Detail which current user had search
        const res = await axios({
          method: "GET",
          url: `/u/profile/${params.userID}`,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const userData = await res.data;
        const userObj = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
        };
        dispatch(profilePageDataAction(userObj));
        setFetchedAllData(true);
        if (params.userID === userProfileDetailStore.userID) {
          dispatch(
            setRootUserPostData({
              fetchedPostData: true,
              posts: userData.searchedUser.posts,
            })
          );
          dispatch(
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            })
          );
        }
      } catch (err) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        } else {
          toastError("Some Problem Occur, Please Try again later!!!");
        }
        history.push("/u/home");
      }
    } else {
      setFetchedAllData(true);
    }
    if (
      location.pathname.endsWith(params.userID) ||
      location.pathname.endsWith(`${params.userID}/`)
    ) {
      history.push(`/u/profile/${params.userID}/posts`);
    }
  }, []);

  return (
    <>
      {fetchedAllData ? (
        <div className="ProfilePage_Container">
          <Helmet>
            <title>{params.userID}</title>
          </Helmet>
          <OpenSideBarDrawerButton />
          {/* <OpenRightPartDrawerButton /> */}
          <UserInfo />
          <PageRoute />
          <div className="ProfilePage_UserContent_Container">
            <RoutingProfilePage profilePageData={profilePageData} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
