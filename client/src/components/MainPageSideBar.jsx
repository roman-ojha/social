import React, { useEffect, useState } from "react";
import mainPage_Logo from "../assets/svg/mainPage_Logo.svg";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MainPageSearchBar from "./MainPageSearchBar";
import User_Profile_Icon from "../assets/svg/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { instance as axios } from "../services/axios";
import { Icon } from "@iconify/react";
import "../styles/components/mainPageSideBar.css";
import {
  profilePageDataAction,
  startProgressBar,
  stopProgressBar,
  openSideBarDrawer,
} from "../services/redux-actions";

const MainPageSideBar = () => {
  let selectedLinkIndex;
  let location;
  const history = useHistory();
  const dispatch = useDispatch();
  location = useLocation();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const sideBarDrawerState = useSelector((state) => state.sideBarDrawerReducer);
  const [selectedIndex, setSelectedIndex] = useState();
  const userLogOut = async () => {
    try {
      dispatch(startProgressBar());
      const res = await axios({
        method: "GET",
        url: "/u/logout",
        withCredentials: true,
      });
      dispatch(stopProgressBar());
      history.push("/signin", { replace: true });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      dispatch(stopProgressBar());
    }
  };

  const MainPageFriend = (props) => {
    return (
      <>
        <div
          className="MainPage_SideBar_Friend_Outline"
          onClick={async () => {
            try {
              dispatch(startProgressBar());
              const res = await axios({
                method: "GET",
                url: `/u/profile/${props.friendDetail.userID}`,
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              });
              const userData = await res.data;
              if (res.status !== 200 && !userData.success) {
                // error
              } else {
                // success
                const userObj = {
                  ...userData.searchedUser,
                  isRootUserFollowed: userData.isRootUserFollowed,
                };
                dispatch(profilePageDataAction(userObj));
                dispatch(stopProgressBar());
                history.push(`/u/profile/${props.friendDetail.userID}`);
              }
            } catch (err) {
              dispatch(stopProgressBar());
            }
          }}
        >
          <img
            src={
              props.friendDetail.picture === undefined
                ? User_Profile_Icon
                : props.friendDetail.picture
            }
            alt=""
            className="MainPage_SideBar_Friend_Image"
          />
          <p className="MainPage_SideBar_Friend_Name">
            {props.friendDetail.userID}
          </p>
          <div className="MainPage_SideBar_Friend_Active_Status">
            <p>Active</p>
          </div>
        </div>
      </>
    );
  };
  const ShowFriends = () => {
    // Displaying current user friends
    return (
      <>
        <div className="MainPage_SideBar_Friends_Inner_Container">
          {userProfileDetailStore.friends.map((friendDetail) => {
            return (
              <MainPageFriend
                friendDetail={friendDetail}
                key={friendDetail._id}
              />
            );
          })}
        </div>
      </>
    );
  };

  // coloring the selected url page side bar onload
  const colorSelectedUrl = () => {
    // updating color of sidebar tab through useEffect
    try {
      switch (location.pathname) {
        case "/u":
          selectedLinkIndex = 0;
          setSelectedIndex(0);
          break;
        case "/u/video":
          selectedLinkIndex = 1;
          setSelectedIndex(1);
          break;
        case "/u/message":
          selectedLinkIndex = 2;
          setSelectedIndex(2);
          break;
        case "/u/setting":
          selectedLinkIndex = 3;
          setSelectedIndex(3);
          break;
        default:
          break;
      }
      if (location.pathname.includes("/u/profile")) {
        selectedLinkIndex = 4;
        setSelectedIndex(4);
      }
      const selectedLinkElement = document.getElementsByClassName(
        "MainPage_SideBar_Link"
      )[selectedLinkIndex];
      selectedLinkElement.firstElementChild.style.backgroundColor =
        "var(--primary-color-point-7)";
      selectedLinkElement.firstElementChild.nextElementSibling.setAttribute(
        "color",
        "var(--primary-color-point-7)"
      );
      selectedLinkElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
        "var(--primary-color-point-7)";
    } catch (err) {}
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
  const [onSearchBar, setOnSearchBar] = useState(false);
  const [searchBarData, setSearchBarData] = useState("");
  const [userSearchResult, setUserSearchResult] = useState([]);
  const getUserSearchData = async (e) => {
    setSearchBarData(e.target.value);
    try {
      const res = await axios({
        method: "POST",
        url: `/u/search`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ name: e.target.value }),
        withCredentials: true,
      });
      const resUser = await res.data;
      setUserSearchResult(resUser);
    } catch (err) {}
  };
  return (
    <>
      <div className="SideBar_Drawer_Container Close_SideBar_Drawer">
        <div className="MainPage_SideBar_Container">
          <div className="MainPage_SideBar_Logo_Search_Container">
            <NavLink to="/u">
              <img
                className="MainPage_SideBar_Page_Logo"
                id="MainPage_Logo"
                src={mainPage_Logo}
                alt="logo"
              />
            </NavLink>
            <div className="MainPage_SideBar_Search_Outline">
              <Icon
                className="MainPage_SideBar_Search_Icon"
                icon="bi:search"
                onClick={() => {
                  dispatch(openSideBarDrawer(true));
                }}
              />
              <input
                className="MainPage_SideBar_Search_Input_Field"
                type="text"
                placeholder="Search"
                onClick={(e) => {
                  document.getElementById("MainPage_Logo").style =
                    "visibility:hidden;position:absolute";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Outline"
                  ).style.width = "85%";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Back_Icon"
                  ).style = "visibility: visible;position: static;";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Icon"
                  ).style = "visibility:hidden;position:absolute;";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Input_Field"
                  ).style = "width:80%";
                  setOnSearchBar(true);
                }}
                value={searchBarData}
                onChange={getUserSearchData}
              />

              <ArrowForwardIcon
                className="MainPage_SideBar_Search_Back_Icon"
                style={{ width: "1.5rem", height: "1.5rem" }}
                onClick={() => {
                  document.getElementById("MainPage_Logo").style =
                    "visibility:visible;position:static";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Outline"
                  ).style.width = "65%";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Back_Icon"
                  ).style = "visibility: hidden;";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Icon"
                  ).style = "visibility:visible;position:static;";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Input_Field"
                  ).style = "width:65%";
                  document.querySelector(
                    ".MainPage_SideBar_Search_Input_Field"
                  ).value = "";
                  setOnSearchBar(false);
                }}
              />
            </div>
          </div>
          {onSearchBar ? (
            <MainPageSearchBar userSearchResult={userSearchResult} />
          ) : (
            ""
          )}
          <div className="MainPage_SideBar_Menu_Container">
            <h2 className="MainPage_SideBar_Menu_Title">Menu</h2>
            <div className="MainPage_SideBar_Menu_NavLink_Container">
              <NavLink
                to="/u"
                className="MainPage_SideBar_Menu_Home_Container MainPage_SideBar_Link"
              >
                <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
                <Icon
                  className="MainPage_SideBar_Menu_Home_Logo"
                  icon="ant-design:home-filled"
                  color={
                    selectedIndex === 0 ? "var(--primary-color-point-7)" : ""
                  }
                />
                <h3 className="MainPage_SideBar_Menu_Home_Title">Home</h3>
              </NavLink>
              <NavLink
                to="/u/video"
                className="MainPage_SideBar_Menu_Video_Container MainPage_SideBar_Link"
              >
                <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
                <Icon
                  className="MainPage_SideBar_Menu_Home_Logo"
                  icon="clarity:video-gallery-solid"
                  color={
                    selectedIndex === 1 ? "var(--primary-color-point-7)" : ""
                  }
                />
                <h3 className="MainPage_SideBar_Menu_Video_Title">Video</h3>
              </NavLink>
              <NavLink
                to="/u/message"
                className="MainPage_SideBar_Menu_Message_Container MainPage_SideBar_Link"
              >
                <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
                <Icon
                  className="MainPage_SideBar_Menu_Home_Logo"
                  icon="ant-design:message-filled"
                  color={
                    selectedIndex === 2 ? "var(--primary-color-point-7)" : ""
                  }
                />
                <h3 className="MainPage_SideBar_Menu_Message_Title">Message</h3>
              </NavLink>
              <NavLink
                to="/u/setting"
                className="MainPage_SideBar_Menu_Setting_Container MainPage_SideBar_Link"
              >
                <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
                <Icon
                  className="MainPage_SideBar_Menu_Home_Logo"
                  icon="ant-design:setting-filled"
                  color={
                    selectedIndex === 3 ? "var(--primary-color-point-7)" : ""
                  }
                />
                <h3 className="MainPage_SideBar_Menu_Setting_Title">Setting</h3>
              </NavLink>
              <NavLink
                to={`/u/profile/${userProfileDetailStore.userID}`}
                className="MainPage_SideBar_Menu_Profile_Container MainPage_SideBar_Link"
              >
                <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
                <Icon
                  className="MainPage_SideBar_Menu_Home_Logo"
                  icon="gg:profile"
                  color={
                    selectedIndex === 4 ? "var(--primary-color-point-7)" : ""
                  }
                />
                <h3 className="MainPage_SideBar_Menu_Profile_Title">Profile</h3>
              </NavLink>
            </div>
            <hr className="MainPage_SideBar_Horizontal_Line" />
          </div>
          <div className="MainPage_SideBar_Friends_Container">
            <h2 className="MainPage_SideBar_Friends_Title">Friends</h2>
            <ShowFriends />
          </div>
          <hr className="MainPage_SideBar_Horizontal_Line" />
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
                  history.push(`/u/profile/${userProfileDetailStore.userID}`);
                }}
                alt="profile"
              />
              <h3
                className="MainPage_SideBar_User_Account_Name"
                onClick={() => {
                  history.push(`/u/profile/${userProfileDetailStore.userID}`);
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
