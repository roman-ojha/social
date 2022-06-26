import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   profilePageDataAction,
//   setRootUserProfileDataState,
// } from "../../../services/redux-actions";
import User_Profile_Icon from "../../../assets/svg/User_profile_Icon.svg";
import FilePicker from "./FilePicker";
import EmojiMart from "./EmojiMart";
import InputField from "./InputField";
import PostButton from "./PostButton";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../services/redux";

const MaxViewPostField = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const { profilePageDataAction, setRootUserProfileDataState } =
    bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <form
        className="HomePage_MaxView_UserPost_Field_Container"
        id="HomePage_MaxView_UserPost_Field_Container_ID"
      >
        <div className="HomePage_MaxView_UserPost_Field_Upper_Part_Container">
          <div className="HomePage_MaxField_UserPost_Field_Image_Container">
            <img
              src={
                userProfileDetailStore.picture === undefined
                  ? User_Profile_Icon
                  : userProfileDetailStore.picture
              }
              className="HomePage_MaxField_UserPost_Field_Image"
              onClick={() => {
                const userObj = {
                  ...userProfileDetailStore,
                  isRootUserFollowed: false,
                };
                profilePageDataAction(userObj);
                if (!rootUserProfileDataState.fetchedRootUserProfileData) {
                  setRootUserProfileDataState({
                    fetchedRootUserProfileData: false,
                    getRootUserProfileData: true,
                  });
                }
                history.push(
                  `/u/profile/${userProfileDetailStore.userID}/posts`
                );
              }}
              alt="profile"
            />
          </div>
          <InputField />
          <FilePicker />
        </div>
        <div className="MaxView_UserPost_Image_Container">
          <img
            className="MaxView_UserPost_Image"
            src=""
            alt="img"
            style={{ position: "absolute", display: "none" }}
          />
        </div>
      </form>
      <PostButton />
      <EmojiMart />
    </>
  );
};

export default MaxViewPostField;
