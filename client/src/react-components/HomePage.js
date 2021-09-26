import React, { useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  userPostResponseData,
  mainPageMessageViewOnOff,
} from "../redux-actions/index";

const HomePageFeed = (props) => {
  return (
    <>
      <div className="HomePage_Feed_Content_Container">
        <div className="HomePage_Feed_Image_Container">
          <img
            src={props.userPostData.picture.url}
            // src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
            alt="post"
          />
        </div>
        <div className="HomePage_Feed_Info_Container">
          <div className="HomePage_Feed_Info_User_Image">
            <img
              src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
              alt="user"
            />
          </div>
          <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
            <div className="HomePage_Feed_User_Name_And_Time_InfoContainer">
              <p className="HomePage_Feed_User_ID_Text">
                Kath_and_renfdsaasdafafdds
              </p>
              <p className="HomePage_Feed_User_Time_Text">3h</p>
            </div>
            <p className="HomePage_Feed_User_Name_Text">Katherine</p>
          </div>
          <div className="HomePage_Feed_Love_Comment_Share_Info_Container">
            <FavoriteBorderIcon
              className="HomePage_Feed_Love_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
            <CommentRoundedIcon
              className="HomePage_Feed__Comment_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
            <ShareIcon
              className="HomePage_Feed_Share_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
            <MoreVertIcon
              className="HomePage_Feed_More_Info_Icon"
              style={{ width: "1.7rem", height: "1.7rem" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  const userPostResponseDataState = useSelector(
    (state) => state.setUserPostResponseData
  );
  const userPostDataDispatch = useDispatch();
  const [viewValue, setViewValue] = useState("min");
  const SelectUserPostFieldView = () => {
    const MinViewUserPostField = () => {
      return (
        <>
          <div className="HomePage_MinView_UserPost_Field_Container">
            <img
              src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
              className="HomePage_MinField_UserPost_Field_Image"
              alt="profile"
            />
            <input
              className="HomePage_MinView_UserPost_Input_Field"
              type="text"
              placeholder="Post Your Thought...."
              onClick={() => {
                setViewValue("max");
              }}
            />
          </div>
        </>
      );
    };
    const MaxViewUserPostField = () => {
      const [userPostData, setUserPostData] = useState("");
      let count = 0;
      const minView = (e) => {
        var isClickInsideElement = document
          .getElementsByClassName("HomePage_User_Post_Field_Container")[0]
          .contains(e.target);
        if (!isClickInsideElement && count !== 0) {
          setViewValue("min");
          document.removeEventListener("click", minView);
        }
        count++;
      };
      document.addEventListener("click", minView);
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
          var image = document.getElementById("image-input").files[0];
          let data = new FormData();
          data.append("image", image);
          data.append("content", userPostData);
          // we can be able to pass the other form of data like this
          const res = await fetch("/u/post", {
            method: "POST",
            body: data,
          });
          const resData = await res.json();
          console.log(resData);
          // window.open(`${resData.picture.url}`, "_blank");
          setViewValue("min");
          userPostDataDispatch(userPostResponseData(resData));
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
                  src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
                  className="HomePage_MaxField_UserPost_Field_Image"
                  alt="profile"
                />
              </div>

              <textarea
                className="HomePage_MaxView_UserPost_Input_Field"
                placeholder="Post Your Thought...."
                autoFocus
                value={userPostData}
                onChange={(e) => {
                  setUserPostData(e.target.value);
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
                />
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
            <button
              className="HomePage_MaxView_UserPost_Field_Post_Button"
              onClick={uploadUserPost}
            >
              Post
            </button>
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
  const ReturnCurrentUserPost = () => {
    if (
      userPostResponseDataState.picture.name === "" &&
      userPostResponseDataState.content == ""
    ) {
      return <></>;
    } else {
      return (
        <>
          <HomePageFeed userPostData={userPostResponseDataState} />
        </>
      );
    }
  };
  return (
    <>
      <div className="HomePage_Container">
        <div className="HomePage_User_Post_Field_Container">
          <SelectUserPostFieldView />
        </div>
        <div className="HomePage_Feed_Main_Container">
          <ReturnCurrentUserPost />
          <HomePageFeed userPostData={userPostResponseDataState} />
          <HomePageFeed userPostData={userPostResponseDataState} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
