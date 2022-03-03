import React, { useEffect, useState } from "react";
import mainPage_Logo from "../Images/mainPage_Logo.svg";
import mainPage_sideBar_search from "../Images/mainPage_sideBar_Search.svg";
import mainPage_Logout_Icon from "../Images/mainPage_Logout_Icon.svg";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MainPageSearchBar from "../react-components/MainPageSearchBar";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { instance as axios } from "../services/axios";
let previouslySelectedElement;
let selectedLinkIndex;
let location;

const MainPageSideBar = () => {
  const history = useHistory();
  location = useLocation();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userLogOut = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/u/logout",
        header: {
          Accpet: "application/josn",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      history.push("/signin", { replace: true });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {}
  };

  const MainPageFriend = (props) => {
    return (
      <>
        <div
          className="MainPage_SideBar_Friend_Outline"
          onClick={() => {
            history.push(`/u/profile/${props.friendDetail.userID}`);
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
  const colorSelectedMainPage = (e) => {
    let parentElement;
    try {
      if (e.target.tagName === "A") {
        // this will execute if clicked tagName is "A" which is the parent element
        parentElement = e.target;
      } else {
        parentElement = e.target.parentElement;
      }
      parentElement.firstElementChild.style.backgroundColor =
        "var(--primary-color-point-7)";
      parentElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
        "var(--primary-color-point-7)";
      parentElement.firstElementChild.nextElementSibling.style.color =
        "var(--primary-color-point-7)";
      if (
        previouslySelectedElement !== parentElement &&
        previouslySelectedElement !== undefined
      ) {
        previouslySelectedElement.firstElementChild.style.backgroundColor =
          "transparent";
        previouslySelectedElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
          "var(--medium-opacity-font-color)";
        previouslySelectedElement.firstElementChild.nextElementSibling.style.color =
          "var(--logo-icon-low-opacity-black-color-point-3)";
      }
      previouslySelectedElement = parentElement;
    } catch (err) {}
  };
  // coloring the selected url page side bar onload
  const colorSelectedUrl = () => {
    try {
      switch (location.pathname) {
        case "/u":
          selectedLinkIndex = 0;
          break;
        case "/u/video":
          selectedLinkIndex = 1;
          break;
        case "/u/message":
          selectedLinkIndex = 2;
          break;
        case "/u/setting":
          selectedLinkIndex = 3;
          break;
        default:
          break;
      }
      if (location.pathname.includes("/u/profile")) {
        selectedLinkIndex = 4;
      }

      const selectedLinkElement = document.getElementsByClassName(
        "MainPage_SideBar_Link"
      )[selectedLinkIndex];
      selectedLinkElement.firstElementChild.style.backgroundColor =
        "var(--primary-color-point-7)";
      selectedLinkElement.firstElementChild.nextElementSibling.nextElementSibling.style.color =
        "var(--primary-color-point-7)";
      selectedLinkElement.firstElementChild.nextElementSibling.style.color =
        "var(--primary-color-point-7)";
      previouslySelectedElement = selectedLinkElement;
    } catch (err) {}
  };
  useEffect(() => {
    colorSelectedUrl();
  }, []);
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
      <div className="MainPage_SideBar_Container">
        <div className="MainPage_SideBar_Logo_Search_Container">
          <img
            className="MainPage_SideBar_Page_Logo"
            id="MainPage_Logo"
            src={mainPage_Logo}
            alt="logo"
          />
          <div className="MainPage_SideBar_Search_Outline">
            <img
              className="MainPage_SideBar_Search_Icon"
              src={mainPage_sideBar_search}
              alt="search"
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
                document.querySelector(".MainPage_SideBar_Search_Icon").style =
                  "visibility:hidden;position:absolute;";
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
                document.querySelector(".MainPage_SideBar_Search_Icon").style =
                  "visibility:visible;position:static;";
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
              onClick={colorSelectedMainPage}
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <span
                className="MainPage_SideBar_Menu_Home_Logo iconify"
                data-icon="ant-design:home-filled"
              ></span>
              <h3 className="MainPage_SideBar_Menu_Home_Title">Home</h3>
            </NavLink>
            <NavLink
              to="/u/video"
              className="MainPage_SideBar_Menu_Video_Container MainPage_SideBar_Link"
              onClick={colorSelectedMainPage}
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <span
                className="MainPage_SideBar_Menu_Home_Logo iconify"
                data-icon="clarity:video-gallery-solid"
              ></span>
              <h3 className="MainPage_SideBar_Menu_Video_Title">Video</h3>
            </NavLink>
            <NavLink
              to="/u/message"
              className="MainPage_SideBar_Menu_Message_Container MainPage_SideBar_Link"
              onClick={colorSelectedMainPage}
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <span
                className="MainPage_SideBar_Menu_Home_Logo iconify"
                data-icon="ant-design:message-filled"
              ></span>
              <h3 className="MainPage_SideBar_Menu_Message_Title">Message</h3>
            </NavLink>
            <NavLink
              to="/u/setting"
              className="MainPage_SideBar_Menu_Setting_Container MainPage_SideBar_Link"
              onClick={colorSelectedMainPage}
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <span
                className="MainPage_SideBar_Menu_Home_Logo iconify"
                data-icon="ant-design:setting-filled"
              ></span>
              <h3 className="MainPage_SideBar_Menu_Setting_Title">Setting</h3>
            </NavLink>
            <NavLink
              to={`/u/profile/${userProfileDetailStore.userID}`}
              className="MainPage_SideBar_Menu_Profile_Container MainPage_SideBar_Link"
              onClick={colorSelectedMainPage}
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <span
                className="MainPage_SideBar_Menu_Home_Logo iconify"
                data-icon="gg:profile"
              ></span>
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
              alt="profile"
            />
            <h3 className="MainPage_SideBar_User_Account_Name">
              {userProfileDetailStore.userID === undefined
                ? userProfileDetailStore.name
                : userProfileDetailStore.userID}
            </h3>
            <img
              src={mainPage_Logout_Icon}
              className="MainPage_LogOut_Icon"
              alt="logout"
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
    </>
  );
};

export default MainPageSideBar;
