import React from "react";
import { NavLink } from "react-router-dom";
import User_profile_icon from "../Images/User_profile_Icon_color_white.svg";
import { useDispatch, useSelector } from "react-redux";
import { searchedUserProfileAction } from "../redux-actions/index";
import { instance as axios } from "../services/axios";

const MainPageSearchBar = (props) => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  let noResultFound = true;
  // Storing Searched userData into redux
  const searchUserProfileStore = useSelector(
    (state) => state.setSearchUserProfileReducer
  );
  const dispatch = useDispatch();

  const SearchBarUser = (props) => {
    // console.log(props.userDetail);
    return (
      <>
        <NavLink
          className="MainPage_SearchBar_User_Container"
          to={`/u/profile/${props.userDetail.userID}`}
          onClick={async () => {
            if (userProfileDetailStore.userID !== props.userDetail.userID) {
              // fetching user Detail which current user had search
              const res = await axios({
                method: "GET",
                url: `/u/profile/${props.userDetail.userID}`,
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
              dispatch(searchedUserProfileAction(userObj));
            }
          }}
        >
          {/* here link goes to there user profile  using userid link*/}
          <img
            src={
              props.userDetail.picture === undefined
                ? User_profile_icon
                : props.userDetail.picture
            }
            alt="user"
          />
          <p>{props.userDetail.userID}</p>
        </NavLink>
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
