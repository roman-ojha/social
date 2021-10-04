import React, { useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "emoji-mart/css/emoji-mart.css";
import LoadingSpinner from "./LoadingSpinner";
import { Picker } from "emoji-mart";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import {
  userPostResponseData,
  mainPageMessageViewOnOff,
  homePageUserPostFieldDataAction,
} from "../redux-actions/index";
import UserPostFeed from "./UserPostFeed";

const HomePage = () => {
  // storing user Profile Detail
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userPostResponseDataState = useSelector(
    (state) => state.setUserPostResponseData
  );
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const userPostResponseDataDispatch = useDispatch();
  const homePageUserPostFieldDataDispatch = useDispatch();
  const [viewValue, setViewValue] = useState("min");
  const [homePageUserPostEmojiView, setHomePageUserPostEmojiView] =
    useState(false);
  const [userPostResponseLoading, setUserPostResponseLoading] = useState(false);
  const SelectUserPostFieldView = () => {
    const MinViewUserPostField = () => {
      return (
        <>
          <div className="HomePage_MinView_UserPost_Field_Container">
            <img
              src={
                userProfileDetailStore.picture === undefined
                  ? User_Profile_Icon
                  : userProfileDetailStore.picture
              }
              className="HomePage_MinField_UserPost_Field_Image"
              alt="profile"
            />
            <input
              className="HomePage_MinView_UserPost_Input_Field"
              type="text"
              placeholder="Post Your Thought...."
              value={homePageUserPostFieldData.content}
              onChange={() => {}}
              onClick={() => {
                setViewValue("max");
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
                homePageUserPostFieldDataDispatch(
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
          image.style.visibility = "visible";
          image.style.position = "static";
          image.src = URL.createObjectURL(event.target.files[0]);
        } catch (err) {}
      };
      // uploading post to database
      const uploadUserPost = async (e) => {
        try {
          e.preventDefault();
          setUserPostResponseLoading(true);
          var image = document.getElementById("image-input").files[0];
          let data = new FormData();
          data.append("image", image);
          data.append("caption", userPostData);
          // we can be able to pass the other form of data like this
          const res = await fetch("/u/post", {
            method: "POST",
            body: data,
          });
          const resData = await res.json();
          if (res.status === 201) {
            userPostResponseDataDispatch(userPostResponseData(resData));
          }
          console.log(resData);
          setUserPostResponseLoading(false);
          setViewValue("min");
        } catch (err) {}
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
                  <PhotoLibraryIcon
                    className=" HomePage_MaxView_UserPost_Field_Icon "
                    style={{ width: "2rem", height: "2rem" }}
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
                  <VideoLibraryIcon
                    className=" HomePage_MaxView_UserPost_Field_Icon "
                    style={{ width: "2rem", height: "2rem" }}
                  />
                </label>
                <input
                  id="video-input"
                  type="file"
                  style={{ visibility: "hidden" }}
                />
                <InsertEmoticonIcon
                  className=" HomePage_MaxView_UserPost_Field_Icon "
                  style={{ width: "2rem", height: "2rem" }}
                  onClick={() => {
                    homePageUserPostFieldDataDispatch(
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
                style={{ visibility: "hidden", position: "absolute" }}
              />
            </div>
            <div className="HomePage_MaxView_UserPost_Field_Back_and_Post_Button_Container">
              <ArrowBackIcon
                className="HomePage_MaxView_UserPost_Field_Back_Icon"
                style={{ width: "2rem" }}
                onClick={() => {
                  homePageUserPostFieldDataDispatch(
                    homePageUserPostFieldDataAction({
                      ...homePageUserPostFieldData,
                      content: userPostData,
                    })
                  );
                  setViewValue("min");
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
  const defaultFeedData = [
    {
      id: "",
      useremail: "",
      username: "Katherin",
      userID: "",
      caption: "",
      picture: {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      },
      like: "",
      date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    },
  ];
  return (
    <>
      {userPostResponseLoading ? <LoadingSpinner /> : ""}
      <div className="HomePage_Container">
        <div className="HomePage_User_Post_Field_Container">
          <SelectUserPostFieldView />
        </div>
        <div className="HomePage_Feed_Main_Container">
          {/* Displaying current userPost filed */}
          {userPostResponseDataState.map((value) => {
            return (
              <UserPostFeed
                key={value.id}
                // sending user main information
                userMainInformation={userProfileDetailStore}
                // sending user feed information information
                userFeedData={value}
              />
            );
          })}
          {/* Displaying current user Followed User post field filed */}
          {/* <UserPostFeed userFeedData={defaultFeedData[0]} /> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
