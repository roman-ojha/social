import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import "../../styles/components/mainPageSideBar.css";
import {
  startProgressBar,
  stopProgressBar,
  openSideBarDrawer,
} from "../../services/redux-actions";
import Api from "../../services/api/components/MainPageSideBar";
import { toastSuccess, toastError } from "../../services/toast";
import LogoAndSearchBar from "./LogoAndSearchBar";
import Menu from "./Menu";
import Friends from "./Friends";

const MainPageSideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const sideBarDrawerState = useSelector((state) => state.sideBarDrawerReducer);
  const [onSearchBar, setOnSearchBar] = useState(false);
  const userLogOut = async () => {
    try {
      dispatch(startProgressBar());

      const res = await Api.logOut();
      const data = await res.data;
      history.push("/signin", { replace: true });
      if (res.status === 200 && data.success) {
        toastSuccess(data.msg);
      } else {
        // const error = new Error(res.error);
        // throw error;
        toastError(data.msg);
      }
      dispatch(stopProgressBar());
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      history.push("/signin", { replace: true });
      dispatch(stopProgressBar());
    }
  };

  useEffect(() => {
    // colorSelectedUrl();

    document
      .getElementsByClassName("SideBar_Drawer_Container")[0]
      .addEventListener("click", (e) => {
        if (
          !document
            .getElementsByClassName("MainPage_SideBar_Container")[0]
            .contains(e.target)
        ) {
          dispatch(openSideBarDrawer(false));
          document.getElementById("MainPage_Logo").style =
            "visibility:visible;position:static";
          document.querySelector(
            ".MainPage_SideBar_Search_Outline"
          ).style.width = "65%";
          document.querySelector(".MainPage_SideBar_Search_Back_Icon").style =
            "visibility: hidden;";
          document.querySelector(".MainPage_SideBar_Search_Icon").style =
            "visibility:visible;position:static;";
          document.querySelector(".MainPage_SideBar_Search_Input_Field").style =
            "width:65%";
          document.querySelector(".MainPage_SideBar_Search_Input_Field").value =
            "";
          setOnSearchBar(false);
        }
      });
  }, []);

  useEffect(() => {
    if (sideBarDrawerState) {
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.add("Open_SideBar_Drawer");
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.remove("Close_SideBar_Drawer");
    } else {
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.remove("Open_SideBar_Drawer");
      document
        .getElementsByClassName("SideBar_Drawer_Container")[0]
        .classList.add("Close_SideBar_Drawer");
    }
  }, [sideBarDrawerState]);
  return (
    <>
      <div className="SideBar_Drawer_Container Close_SideBar_Drawer">
        <div className="MainPage_SideBar_Container">
          <LogoAndSearchBar
            onSearchBar={onSearchBar}
            setOnSearchBar={setOnSearchBar}
          />
          <Menu />
          <Friends />
          <div className="MainPage_SideBar_User_Account_LogOut_Container">
            <h2 className="MainPage_SideBar_Account_Title">Account</h2>
            <div className="MainPage_SideBar_User_Account_Logout_Outline">
              <img
                src={
                  userProfileDetailStore.picture === undefined
                    ? User_Profile_Icon
                    : userProfileDetailStore.picture
                }
                className="MainPage_SideBar_User_Account_Img"
                onClick={() => {
                  history.push(
                    `/u/profile/${userProfileDetailStore.userID}/posts`
                  );
                }}
                alt="profile"
              />
              <h3
                className="MainPage_SideBar_User_Account_Name"
                onClick={() => {
                  history.push(
                    `/u/profile/${userProfileDetailStore.userID}/posts`
                  );
                }}
              >
                {userProfileDetailStore.userID === undefined
                  ? userProfileDetailStore.name
                  : userProfileDetailStore.userID}
              </h3>
              <Icon
                className="MainPage_LogOut_Icon"
                icon="ri:logout-circle-line"
                onClick={userLogOut}
              />
              <button
                className="MainPage_SideBar_User_Logout_Button"
                onClick={userLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPageSideBar;
