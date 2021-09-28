import React, { useState } from "react";
import User_profile_icon from "../Images/User_profile_Icon_color_white.svg";

const MainPageSearchBar = (props) => {
  // const [noResultFound, setNoResultFound] = useState(true);
  let noResultFound = true;
  const SearchBarUser = (props) => {
    return (
      <>
        <div className="MainPage_SearchBar_User_Container">
          <img
            src={
              props.userDetail.picture === undefined
                ? User_profile_icon
                : props.userDetail.picture
            }
            alt="user"
          />
          <p>{props.userDetail.name}</p>
        </div>
      </>
    );
  };
  const ReturnSearchBarUser = () => {
    return (
      <>
        {props.userSearchResult.map((value) => {
          return <SearchBarUser userDetail={value} key={value._id} />;
        })}
      </>
    );
  };
  const ReturnNoResultFound = () => {
    return (
      <>
        <div className="MainPage_SearchBar_No_Result_Container">
          <p>No Result Found</p>
        </div>
      </>
    );
  };
  const ReturnSearchResult = () => {
    if (props.userSearchResult.length === 0) {
      noResultFound = true;
    } else {
      noResultFound = false;
    }
    return (
      <> {noResultFound ? <ReturnNoResultFound /> : <ReturnSearchBarUser />}</>
    );
  };
  return (
    <>
      <div className="MainPage_SearchBar_Container">
        <h3>Search Result:</h3>
        <hr />
        <div className="MainPage_SearchBar_All_User_Container">
          <ReturnSearchResult />
        </div>
      </div>
    </>
  );
};

export default MainPageSearchBar;
