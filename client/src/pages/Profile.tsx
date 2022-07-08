import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { instance as axios } from "../services/axios";
// import {
//   profilePageDataAction,
//   setRootUserProfileDataState,
//   setRootUserPostData,
// } from "../services/redux-actions/index";
import { useLocation, useHistory, useParams } from "react-router-dom";
import "../styles/pages/profilePage.css";
import { Helmet } from "react-helmet";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import { toastError } from "../services/toast";
import RoutingProfilePage from "../routes/RoutingProfilePage";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import UserInfo from "../components/ProfilePage/UserInfo";
import PageRoute from "../components/ProfilePage/PageRoute";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../services/redux";
import { AxiosError } from "axios";
import { ProfilePageDataState } from "../services/redux/pages/profile/profilePageData/types";

const Profile = (): JSX.Element => {
  const history = useHistory();
  const params: { userID: string } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [fetchedAllData, setFetchedAllData] = useState<boolean>(false);
  const profilePageData: ProfilePageDataState = useSelector(
    (state: AppState) => state.profilePageDataReducer
  );
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const {
    profilePageDataAction,
    setRootUserProfileDataState,
    setRootUserPostData,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const initializeProfilePage = async () => {
      if (!profilePageData.throughRouting) {
        console.log("get");
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
          const userObj: ProfilePageDataState = {
            ...userData.searchedUser,
            isRootUserFollowed: userData.isRootUserFollowed,
            throughRouting: true,
          };
          profilePageDataAction(userObj);
          setFetchedAllData(true);
          if (params.userID === userProfileDetailStore.userID) {
            setRootUserPostData({
              fetchedPostData: true,
              posts: userData.searchedUser.posts,
            });
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            });
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
    };
    initializeProfilePage();
  }, [
    dispatch,
    history,
    location.pathname,
    params.userID,
    profilePageData.userID,
    rootUserProfileDataState.getRootUserProfileData,
    userProfileDetailStore.userID,
  ]);

  return (
    <>
      {fetchedAllData ? (
        <main className="ProfilePage_Container">
          <Helmet>
            <title>{params.userID}</title>
          </Helmet>
          <OpenSideBarDrawerButton />
          <OpenRightPartDrawerButton />
          <UserInfo />
          <PageRoute />
          <div className="ProfilePage_UserContent_Container">
            <RoutingProfilePage profilePageData={profilePageData} />
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
