import React, { useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const HomePage = () => {
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
    const getUserPostFiledImage = (event) => {
      var image = document.getElementsByClassName("MaxView_UserPost_Image")[0];
      image.style.visibility = "visible";
      image.style.position = "static";
      image.src = URL.createObjectURL(event.target.files[0]);
    };
    const MaxViewUserPostField = () => {
      let count = 0;
      const minView = (e) => {
        var isClickInsideElement = document
          .getElementsByClassName("HomePage_User_Post_Field_Container")[0]
          .contains(e.target);
        if (!isClickInsideElement && count != 0) {
          setViewValue("min");
          document.removeEventListener("click", minView);
        }
        count++;
      };
      document.addEventListener("click", minView);
      return (
        <>
          <div
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
            <button className="HomePage_MaxView_UserPost_Field_Post_Button">
              Post
            </button>
          </div>
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
  return (
    <>
      <div className="HomePage_Container">
        <div className="HomePage_User_Post_Field_Container">
          <SelectUserPostFieldView />
        </div>
      </div>
    </>
  );
};

export default HomePage;
