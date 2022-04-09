import React from "react";
import { userProfileDetailAction } from "../redux-actions";
import { useDispatch, useSelector } from "react-redux";
const ProfileFriends = () => {
  const profilePageData = useSelector((state) => state.profilePageDataReducer);

  return <div></div>;
};

export default ProfileFriends;
