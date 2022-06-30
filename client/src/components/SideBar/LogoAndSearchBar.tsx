import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import mainPage_Logo from "../../assets/svg/mainPage_Logo.svg";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import Api from "../../services/api/components/MainPageSideBar";
import { toastError } from "../../services/toast";
// import { openSideBarDrawer } from "../../services/redux-actions";
import { actionCreators } from "../../services/redux";
import { bindActionCreators } from "redux";
import { AxiosError } from "axios";

interface LogoAndSearchBarProps {
  onSearchBar: boolean;
  setOnSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoAndSearchBar: React.FC<LogoAndSearchBarProps> = ({
  onSearchBar,
  setOnSearchBar,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { openSideBarDrawer } = bindActionCreators(actionCreators, dispatch);
  const [userSearchResult, setUserSearchResult] = useState<[]>([]);
  const [searchBarData, setSearchBarData] = useState<string>("");
  const getUserSearchData = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setSearchBarData(e.target.value);
    try {
      const res = await Api.getSearchedUserData(e.target.value);
      const resUser = await res.data;
      setUserSearchResult(resUser);
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
  return (
    <>
      <div className="MainPage_SideBar_Logo_Search_Container">
        <NavLink to="/u/home">
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
              openSideBarDrawer(true);
            }}
          />
          <input
            className="MainPage_SideBar_Search_Input_Field"
            type="text"
            placeholder="Search"
            onClick={(e) => {
              document
                .getElementById("MainPage_Logo")!
                .setAttribute("style", "visibility:hidden;position:absolute");
              document
                .querySelector(".MainPage_SideBar_Search_Outline")!
                .setAttribute("style", "width:85%");
              document
                .querySelector(".MainPage_SideBar_Search_Back_Icon")!
                .setAttribute("style", "visibility: visible;position: static;");
              document
                .querySelector(".MainPage_SideBar_Search_Icon")!
                .setAttribute("style", "visibility:hidden;position:absolute;");
              document
                .querySelector(".MainPage_SideBar_Search_Input_Field")!
                .setAttribute("style", "width:80%");
              setOnSearchBar(true);
            }}
            value={searchBarData}
            onChange={getUserSearchData}
          />

          <ArrowForwardIcon
            className="MainPage_SideBar_Search_Back_Icon"
            style={{ width: "1.5rem", height: "1.5rem" }}
            onClick={() => {
              document
                .getElementById("MainPage_Logo")!
                .setAttribute("style", "visibility:visible;position:static");
              document
                .querySelector(".MainPage_SideBar_Search_Outline")!
                .setAttribute("style", "width:65%");
              document
                .querySelector(".MainPage_SideBar_Search_Back_Icon")!
                .setAttribute("style", "visibility: hidden;");
              document
                .querySelector(".MainPage_SideBar_Search_Icon")!
                .setAttribute("style", "visibility:visible;position:static;");
              document
                .querySelector(".MainPage_SideBar_Search_Input_Field")!
                .setAttribute("style", "width:65%");
              (
                document.querySelector(
                  ".MainPage_SideBar_Search_Input_Field"
                )! as HTMLInputElement
              ).value = "";
              setOnSearchBar(false);
            }}
          />
        </div>
      </div>
      {onSearchBar ? <SearchBar userSearchResult={userSearchResult} /> : ""}
    </>
  );
};

export default LogoAndSearchBar;
