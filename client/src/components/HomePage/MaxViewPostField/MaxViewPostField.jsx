import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  profilePageDataAction,
  setRootUserProfileDataState,
  userPostResponseData,
  homePageUserPostFieldDataAction,
  showLoadingSpinner,
  setHomePagePostFieldViewValue,
} from "../../../services/redux-actions";
import User_Profile_Icon from "../../../assets/svg/User_profile_Icon.svg";
import { Picker } from "emoji-mart";
import { Icon } from "@iconify/react";
import Api from "../../../services/api/pages/homeApi";
import { toastError, toastSuccess, toastInfo } from "../../../services/toast";
import FilePicker from "./FilePicker";
import EmojiMart from "./EmojiMart";

const MaxViewPostField = () => {
  const [homePageUserPostEmojiView, setHomePageUserPostEmojiView] =
    useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const [userPostData, setUserPostData] = useState(
    homePageUserPostFieldData.content
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const rootUserProfileDataState = useSelector(
    (state) => state.rootUserProfileDataState
  );

  // uploading post to database
  const uploadUserPost = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoadingSpinner(true));
      var image = document.getElementById("image-input").files[0];
      let data = new FormData();
      data.append("image", image);
      data.append("caption", userPostData);
      // we can be able to pass the other form of data like this
      const res = await Api.post(data);
      const resData = await res.data;
      console.log(resData);
      if (res.status === 200 && resData.success) {
        toastSuccess(resData.msg);
        dispatch(userPostResponseData(resData.data));
      } else {
        // error
        toastError(resData.msg);
      }
      dispatch(showLoadingSpinner(false));
      dispatch(setHomePagePostFieldViewValue("min"));
    } catch (err) {
      if (err.response.data.success === false) {
        toastError(err.response.data.msg);
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(showLoadingSpinner(false));
    }
  };

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
                dispatch(profilePageDataAction(userObj));
                if (!rootUserProfileDataState.fetchedRootUserProfileData) {
                  dispatch(
                    setRootUserProfileDataState({
                      fetchedRootUserProfileData: false,
                      getRootUserProfileData: true,
                    })
                  );
                }
                history.push(
                  `/u/profile/${userProfileDetailStore.userID}/posts`
                );
              }}
              alt="profile"
            />
          </div>

          <textarea
            className="HomePage_MaxView_UserPost_Input_Field"
            placeholder="Post Your Thought...."
            autoFocus
            // type="text"
            value={
              homePageUserPostEmojiView
                ? homePageUserPostFieldData.content
                : userPostData
            }
            onChange={(e) => {
              setUserPostData(e.target.value);
              setHomePageUserPostEmojiView(false);
            }}
          ></textarea>
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
        <div className="HomePage_MaxView_UserPost_Field_Back_and_Post_Button_Container">
          <Icon
            className="HomePage_MaxView_UserPost_Field_Back_Icon"
            icon="eva:arrow-back-fill"
            onClick={() => {
              dispatch(
                homePageUserPostFieldDataAction({
                  ...homePageUserPostFieldData,
                  content: userPostData,
                })
              );
              dispatch(setHomePagePostFieldViewValue("min"));
            }}
          />
          <button
            className="HomePage_MaxView_UserPost_Field_Post_Button"
            onClick={uploadUserPost}
          >
            Post
          </button>
        </div>
      </form>
      <EmojiMart />
    </>
  );
};

export default MaxViewPostField;
