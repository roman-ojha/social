import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toastError, toastSuccess } from "../../services/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserProfilePictureAction,
  showLoadingSpinner,
} from "../../services/redux-actions";
import settingPageApi from "../../services/api/pages/settingPageApi";

const ChangeProfilePicture = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [isImgUrl, setIsImgUrl] = useState(false);
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  const changeProfilePicture = async (e) => {
    try {
      e.preventDefault();
      const imageFile = document.getElementById("user-profile-input").files[0];
      const imageUrl = imgUrl;
      if (!isImgUrl) {
        dispatch(showLoadingSpinner(true));
        const data = new FormData();
        data.append("image", imageFile);
        const res = await settingPageApi.changeImageFileProfilePicture(data);
        const resData = await res.data;
        if (resData.success && res.status === 200) {
          toastSuccess(resData.msg);
          dispatch(changeUserProfilePictureAction(resData.picture));
        } else {
          toastError(resData.msg);
        }
        dispatch(showLoadingSpinner(false));
      } else {
        dispatch(showLoadingSpinner(true));
        const res = await settingPageApi.changeImageUrlProfilePicture(imageUrl);
        const resData = await res.data;
        if (resData.success && res.status === 200) {
          toastSuccess(resData.msg);
          dispatch(changeUserProfilePictureAction(imageUrl));
        } else {
          toastError(resData.msg);
        }
        dispatch(showLoadingSpinner(false));
      }
      setImgUrl("");
    } catch (err) {
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      dispatch(showLoadingSpinner(false));
    }
    setImgUrl("");
  };

  const getNewProfilePicture = (e) => {
    try {
      e.preventDefault();
      const image = document.getElementById("user-profile-input").files[0];
      const imageElement = document.getElementsByClassName(
        "Setting_Page_Change_Profile_Image"
      )[0];
      imageElement.setAttribute("src", URL.createObjectURL(image));
    } catch (e) {}
  };

  useEffect(() => {
    // checking is url is image or not
    const imageElement = document.getElementsByClassName(
      "Setting_Page_Change_Profile_Image"
    )[0];
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      // if url is image
      imageElement.setAttribute("src", imgUrl);
      setIsImgUrl(true);
    };
    img.onerror = () => {
      // if url is not image
      if (document.getElementById("user-profile-input").files[0]) {
        imageElement.setAttribute(
          "src",
          URL.createObjectURL(
            document.getElementById("user-profile-input").files[0]
          )
        );
      } else {
        imageElement.setAttribute("src", userProfileDetailStore.picture);
      }
      setIsImgUrl(false);
    };
  }, [imgUrl, userProfileDetailStore.picture]);

  return (
    <>
      <div className="Setting_Page_Change_Profile_Picture_Container">
        <label htmlFor="setting-page-change-profile-picture">
          Change Profile Picture
        </label>
        <div className="Setting_Page_Change_Profile_Picture_Container_Top_Part">
          <label htmlFor="user-profile-input">
            <img
              src={userProfileDetailStore.picture}
              className="Setting_Page_Change_Profile_Image"
              alt={userProfileDetailStore.userID}
            />
            <div className="Setting_Page_Change_Profile_Image_Info">
              <Icon
                icon="entypo:upload"
                className="Setting_Page_Change_Profile_Image_Upload_Icon"
              />
              <p>upload</p>
            </div>
          </label>
          <input
            id="user-profile-input"
            type="file"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            onChange={getNewProfilePicture}
            style={{
              display: "none",
              position: "absolute",
            }}
          />
          <div className="Setting_Page_Change_Profile_Input_and_Button_Container">
            <input
              id="setting-page-change-profile-picture"
              type="text"
              placeholder="image url"
              className="Setting_Page_Change_Profile_Url_Image_Input_Field"
              name="imgUrl"
              value={imgUrl}
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
            />
            <button onClick={changeProfilePicture}>
              Change Profile Picture
            </button>
          </div>
        </div>
        <div className="Setting_Page_Change_Profile_Picture_Container_Bottom_Part">
          <p>
            NOTE : Consider using image url rather then uploading files because
            cloud database have limited Storage
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangeProfilePicture;
