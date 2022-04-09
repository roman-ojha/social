import React from "react";
import { userProfileDetailAction } from "../redux-actions";
import { useDispatch, useSelector } from "react-redux";
const ProfileFriends = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  return <div className="ProfilePage_Albums_Container"></div>;
};

export default ProfileFriends;
