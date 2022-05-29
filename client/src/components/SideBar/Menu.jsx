import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  profilePageDataAction,
  setRootUserPostData,
  setRootUserProfileDataState,
} from "../../services/redux-actions";
import { toastError } from "../../services/toast";
import profileApi from "../../services/api/pages/profileApi";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // coloring the selected url page side bar onload
  let location;
  location = useLocation();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );

  const fetchUserPostData = async () => {
    try {
      const resPost = await profileApi.getUserPosts();
      const resPostData = await resPost.data;
      if (resPost.status === 200 && resPostData.success) {
        dispatch(
          setRootUserPostData({
            fetchedPostData: true,
            posts: resPostData.posts,
          })
        );
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

  return (
    <>
      <nav className="MainPage_SideBar_Menu_Container">
        <h2 className="MainPage_SideBar_Menu_Title">Menu</h2>
        <div className="MainPage_SideBar_Menu_NavLink_Container">
          <NavLink
            to="/u/home"
            className="MainPage_SideBar_Menu_Home_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="ant-design:home-filled"
            />
            <h3 className="MainPage_SideBar_Menu_Home_Title">Home</h3>
          </NavLink>
          <NavLink
            to="/u/video"
            className="MainPage_SideBar_Menu_Video_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="clarity:video-gallery-solid"
            />
            <h3 className="MainPage_SideBar_Menu_Video_Title">Video</h3>
          </NavLink>
          <NavLink
            to="/u/message"
            className="MainPage_SideBar_Menu_Message_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="ant-design:message-filled"
            />
            <h3 className="MainPage_SideBar_Menu_Message_Title">Message</h3>
          </NavLink>
          <NavLink
            to="/u/setting"
            className="MainPage_SideBar_Menu_Setting_Container MainPage_SideBar_Link"
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="ant-design:setting-filled"
            />
            <h3 className="MainPage_SideBar_Menu_Setting_Title">Setting</h3>
          </NavLink>
          <NavLink
            to={`/u/profile/${userProfileDetailStore.userID}/posts`}
            className="MainPage_SideBar_Menu_Profile_Container MainPage_SideBar_Link"
            onClick={() => {
              const userObj = {
                ...userProfileDetailStore,
                isRootUserFollowed: false,
              };
              dispatch(profilePageDataAction(userObj));
              if (!rootUserProfileDataState.fetchedRootUserProfileData) {
                dispatch(
                  setRootUserProfileDataState({
                    fetchedRootUserProfileData: false,
                    getRootUserProfileData: true,
                  })
                );
              }
            }}
          >
            <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
            <Icon
              className="MainPage_SideBar_Menu_Home_Logo MainPage_SideBar_Menu_Logo"
              icon="gg:profile"
            />
            <h3 className="MainPage_SideBar_Menu_Profile_Title">Profile</h3>
          </NavLink>
        </div>
        <hr className="MainPage_SideBar_Horizontal_Line" />
      </nav>
    </>
  );
};

export default Menu;
