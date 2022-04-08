import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import LoadingSpinner from "../react-components/LoadingSpinner";
import { Picker } from "emoji-mart";
import { useDispatch, useSelector } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import {
  userPostResponseData,
  homePageUserPostFieldDataAction,
} from "../redux-actions/index";
import UserPostFeed from "../react-components/UserPostFeed";
import { instance as axios } from "../services/axios";
import "../styles/pages/homePage.css";
import "../styles/others/emojiMarPacakge.css";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const history = useHistory();
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
  const dispatch = useDispatch();
  const followedUserPostDataStore = useSelector(
    (state) => state.setFollowedUserPostDataReducer
  );
  const userProfilePostStore = useSelector(
    (state) => state.setUserProfilePostReducer
  );
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  const [viewValue, setViewValue] = useState("min");
  const [homePageUserPostEmojiView, setHomePageUserPostEmojiView] =
    useState(false);
  const [userPostResponseLoading, setUserPostResponseLoading] = useState(false);
  const SelectUserPostFieldView = () => {
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
                history.push(`/u/profile/${userProfileDetailStore.userID}`);
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
          const res = await axios({
            method: "POST",
            url: "/u/post",
            data: data,
            withCredentials: true,
          });
          const resData = await res.data;
          if (res.status === 201) {
            dispatch(userPostResponseData(resData));
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
                  onClick={() => {
                    history.push(`/u/profile/${userProfileDetailStore.userID}`);
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
                style={{ visibility: "hidden", position: "absolute" }}
              />
            </div>
            <div className="HomePage_MaxView_UserPost_Field_Back_and_Post_Button_Container">
              {/* <ArrowBackIcon/> */}
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
  const DisplayFollowedUserPost = () => {
    // Displaying Followed User Post
    let userPostFeedElement = [];
    if (followedUserPostDataStore.length !== 0) {
      let getMaxLengthOnce = 0;
      let lengthOfOneUserPostIndex;
      let maxLengthOfUserPost = followedUserPostDataStore[0].posts.length;
      for (let i = 0; i < maxLengthOfUserPost; i++) {
        for (let j = 0; j < followedUserPostDataStore.length; j++) {
          lengthOfOneUserPostIndex = followedUserPostDataStore[j].posts.length;
          if (followedUserPostDataStore[j].posts.length > maxLengthOfUserPost) {
            maxLengthOfUserPost = followedUserPostDataStore[j].posts.length;
          }
          if (followedUserPostDataStore[j].posts[i] === undefined) {
            continue;
          }
          userPostFeedElement.push(
            <UserPostFeed
              key={followedUserPostDataStore[j].posts[i].id}
              userMainInformation={followedUserPostDataStore[j]}
              userFeedData={followedUserPostDataStore[j].posts[i]}
            />
          );
        }
      }
      return <>{userPostFeedElement}</>;
    } else {
      return <></>;
    }
  };
  return (
    <>
      {userPostResponseLoading ? <LoadingSpinner /> : <></>}
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
          {/* Display only those user profile post which are post 5 min ago */}
          {userProfilePostStore.map((post) => {
            // if(post)
            let currentDate = new Date();
            let date5MinutesAgo = new Date(currentDate);
            date5MinutesAgo.setMinutes(date5MinutesAgo.getMinutes() - 5);
            if (date5MinutesAgo.getTime() < new Date(post.date).getTime()) {
              return (
                <UserPostFeed
                  key={post._id}
                  userMainInformation={userProfileDetailStore}
                  userFeedData={post}
                />
              );
            } else {
              return <div key={post._id}></div>;
            }
          })}
          {/* Displaying current user Followed User post field filed */}
          <DisplayFollowedUserPost />
        </div>
      </div>
    </>
  );
};

export default HomePage;
