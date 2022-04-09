import React from "react";
import { userProfileDetailAction } from "../redux-actions";
import { useDispatch, useSelector } from "react-redux";

const ProfileAlbums = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  console.log(userProfileDetailStore);
  return <div>ProfileAlbums</div>;
};

export default ProfileAlbums;
