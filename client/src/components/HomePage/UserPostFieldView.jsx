import React, { useState } from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import {
  userPostResponseData,
  homePageUserPostFieldDataAction,
  setHomePagePostFieldViewValue,
  showLoadingSpinner,
} from "../../services/redux-actions";
import { Picker } from "emoji-mart";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../services/api/pages/homeApi";
import { toastError, toastSuccess } from "../../services/toast";

const UserPostFieldView = () => {
  const history = useHistory();
  // storing user Profile Detail
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const viewValue = useSelector((state) => state.homePagePostFieldViewValue);
  const [homePageUserPostEmojiView, setHomePageUserPostEmojiView] =
    useState(false);
  const MinViewUserPostField = () => {
    return (
      <>
        <div className="HomePage_MinView_UserPost_Field_Container">
          <Helmet>
            <title>Social</title>
          </Helmet>
          <img
            src={
              userProfileDetailStore.picture === undefined
                ? User_Profile_Icon
                : userProfileDetailStore.picture
            }
            className="HomePage_MinField_UserPost_Field_Image"
            onClick={() => {
              history.push(`/u/profile/${userProfileDetailStore.userID}/posts`);
            }}
            alt="profile"
          />
          <input
            className="HomePage_MinView_UserPost_Input_Field"
            type="text"
            placeholder="Post Your Thought...."
            value={homePageUserPostFieldData.content}
            onChange={() => {}}
            onClick={() => {
              dispatch(setHomePagePostFieldViewValue("max"));
            }}
          />
        </div>
      </>
    );
  };
  const MaxViewUserPostField = () => {
    const [userPostData, setUserPostData] = useState(
      homePageUserPostFieldData.content
    );
    // emoji select for post
    const EmojiMart = () => {
      return (
        <div>
          <Picker
            set="facebook"
            onSelect={(emoji) => {
              dispatch(
                homePageUserPostFieldDataAction({
                  ...homePageUserPostFieldData,
                  content: homePageUserPostFieldData.content + emoji.native,
                })
              );
            }}
            title="Pick your emoji..."
            emoji="point_up"
            i18n={{
              categories: { search: "Result", recent: "Recents" },
              skintones: {
                2: "Light Skin Tone",
              },
            }}
            style={{ width: "300px" }}
            color="white"
          />
        </div>
      );
    };
    const getUserPostFiledImage = (event) => {
      try {
        var image = document.getElementsByClassName(
          "MaxView_UserPost_Image"
        )[0];
        image.style.display = "inline";
        image.style.position = "static";
        image.src = URL.createObjectURL(event.target.files[0]);
      } catch (err) {}
    };
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

            <div className="HomePage_MaxView_UserPost_Field_Icons_Container">
              <label htmlFor="image-input">
                <Icon
                  className="HomePage_MaxView_UserPost_Field_Icon"
                  icon="ic:outline-photo-library"
                />
              </label>
              <input
                id="image-input"
                type="file"
                style={{ visibility: "hidden" }}
                onChange={getUserPostFiledImage}
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                name="image"
              />
              <label htmlFor="video-input">
                <Icon
                  className="HomePage_MaxView_UserPost_Field_Icon"
                  icon="ic:outline-video-library"
                />
              </label>
              <input
                id="video-input"
                type="file"
                style={{ visibility: "hidden" }}
              />
              <Icon
                className="HomePage_MaxView_UserPost_Field_Emoji_Icon"
                icon="entypo:emoji-happy"
                onClick={() => {
                  dispatch(
                    homePageUserPostFieldDataAction({
                      ...homePageUserPostFieldData,
                      content: userPostData,
                    })
                  );
                  homePageUserPostEmojiView
                    ? setHomePageUserPostEmojiView(false)
                    : setHomePageUserPostEmojiView(true);
                }}
              />
              {homePageUserPostEmojiView ? <EmojiMart /> : ""}
            </div>
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
      </>
    );
  };
  if (viewValue === "min") {
    return (
      <>
        <MinViewUserPostField />
      </>
    );
  } else if (viewValue === "max") {
    return (
      <>
        <MaxViewUserPostField />
      </>
    );
  }
};

export default UserPostFieldView;
