import React from "react";
import User_profile_icon from "../assets/Images/User_profile_Icon_color_white.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startProgressBar,
  stopProgressBar,
  profilePageDataAction,
} from "../redux-actions";
import { instance as axios } from "../services/axios";

const MainPageSearchBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let noResultFound = true;
  // Storing Searched userData into redux
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  const SearchBarUser = (props) => {
    // console.log(props.userDetail);
    return (
      <>
        <div
          className="MainPage_SearchBar_User_Container"
          onClick={async () => {
            if (props.userDetail.userID === userProfileDetailStore.userID) {
              history.push(`/u/profile/${props.userDetail.userID}`);
            } else {
              try {
                dispatch(startProgressBar());
                const res = await axios({
                  method: "GET",
                  url: `/u/profile/${props.userDetail.userID}`,
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
                  history.push(`/u/profile/${props.userDetail.userID}`);
                }
              } catch (err) {
                dispatch(stopProgressBar());
              }
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
