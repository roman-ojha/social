import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/pages/settingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { instance as axios } from "../services/axios";
import {
  changeUserProfilePictureAction,
  changeRootUserUserIDAction,
  changeRootUserNameAction,
} from "../redux-actions";
import LoadingSpinner from "../react-components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingPage = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const dispatch = useDispatch();
  const [settingInputFieldData, setSettingInputFieldData] = useState({
    userID: "",
    name: "",
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
    imgUrl: "",
  });
  const [isImgUrl, setIsImgUrl] = useState(false);
  const [userPostResponseLoading, setUserPostResponseLoading] = useState(false);
  const getInputFieldData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSettingInputFieldData({
      ...settingInputFieldData,
      [name]: value,
    });
  };
  const changeUserID = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "POST",
        url: "/changeUserID",
        data: { newUserID: settingInputFieldData.userID },
        withCredentials: true,
      });
      const resData = await res.data;
      if (resData.success) {
        dispatch(changeRootUserUserIDAction(resData.userID));
      } else {
        // Toast
      }
    } catch (err) {}
  };
  const changeName = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "POST",
        url: "/changeName",
        data: { newName: settingInputFieldData.name },
        withCredentials: true,
      });
      const resData = await res.data;
      if (resData.success) {
        dispatch(changeRootUserNameAction(resData.name));
      } else {
        // Toast
      }
    } catch (err) {}
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "POST",
      url: "/changePassword",
      withCredentials: true,
      data: {
        oldPassword: settingInputFieldData.oldPassword,
        newPassword: settingInputFieldData.newPassword,
        cNewPassword: settingInputFieldData.cNewPassword,
      },
    });
    console.log(await res.data);
  };
  const deleteUser = (e) => {
    e.preventDefault();
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
  const changeProfilePicture = async (e) => {
    try {
      e.preventDefault();
      const imageFile = document.getElementById("user-profile-input").files[0];
      const imageUrl = settingInputFieldData.imgUrl;
      if (!isImgUrl) {
        setUserPostResponseLoading(true);
        const data = new FormData();
        data.append("image", imageFile);
        const res = await axios({
          method: "POST",
          url: "/changeProfile/imgFile",
          data: data,
          withCredentials: true,
        });
        const resData = await res.data;
        if (resData.success) {
          dispatch(changeUserProfilePictureAction(resData.picture));
        } else {
        }
        setUserPostResponseLoading(false);
      } else {
        setUserPostResponseLoading(true);
        const res = await axios({
          method: "POST",
          url: "/changeProfile/imgUrl",
          data: {
            imageUrl,
          },
          withCredentials: true,
        });
        console.log(await res.data);
        const resData = await res.data;
        if (resData.success) {
          dispatch(changeUserProfilePictureAction(imageUrl));
        } else {
        }
        setUserPostResponseLoading(false);
      }
    } catch (err) {}
  };
  useEffect(() => {
    // checking is url is image or not
    const imageElement = document.getElementsByClassName(
      "Setting_Page_Change_Profile_Image"
    )[0];
    const img = new Image();
    img.src = settingInputFieldData.imgUrl;
    img.onload = () => {
      // if url is image
      imageElement.setAttribute("src", settingInputFieldData.imgUrl);
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
  }, [settingInputFieldData.imgUrl]);
  return (
    <>
      {userPostResponseLoading ? <LoadingSpinner /> : ""}
      <div className="SettingPage_Container">
        <ToastContainer />
        <Helmet>
          <title>Setting</title>
        </Helmet>
        <div className="Setting_Page_Change_Profile_Picture_Container">
          <div className="Setting_Page_Change_Profile_Picture_Container_Top_Part">
            <label htmlFor="user-profile-input">
              <img
                src={userProfileDetailStore.picture}
                className="Setting_Page_Change_Profile_Image"
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
            />
            <div className="Setting_Page_Change_Profile_Input_and_Button_Container">
              <input
                type="text"
                placeholder="image url"
                className="Setting_Page_Change_Profile_Url_Image_Input_Field"
                name="imgUrl"
                value={settingInputFieldData.imgUrl}
                onChange={getInputFieldData}
              />
              <button onClick={changeProfilePicture}>
                Change Profile Picture
              </button>
            </div>
          </div>
          <div className="Setting_Page_Change_Profile_Picture_Container_Bottom_Part">
            <p>
              NOTE : Consider using image url rather then uploading files
              because cloud database have limited Storage
            </p>
          </div>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change UserID</h1>
          <form>
            <input
              type="text"
              placeholder="UserID"
              name="userID"
              value={settingInputFieldData.userID}
              onChange={getInputFieldData}
            />
            <button onClick={changeUserID}>Change</button>
          </form>
          <p>You can only be able to set unique ID for your profile</p>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change display name</h1>
          <form>
            <input
              type="text"
              placeholder="Display Name"
              name="name"
              value={settingInputFieldData.name}
              onChange={getInputFieldData}
            />
            <button onClick={changeName}>Change</button>
          </form>
          <p>Not require to be unique</p>
        </div>
        <div className="Setting_Container_With_Input_Field">
          <h1>Change Password</h1>
          <input
            type="password"
            placeholder="Old password"
            name="oldPassword"
            value={settingInputFieldData.oldPassword}
            onChange={getInputFieldData}
          />
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
            value={settingInputFieldData.newPassword}
            onChange={getInputFieldData}
          />
          <form>
            <input
              type="password"
              placeholder="Conform password"
              name="cNewPassword"
              value={settingInputFieldData.cNewPassword}
              onChange={getInputFieldData}
            />
            <button onClick={changePassword}>Change</button>
          </form>
          <p>Don't Forgot Your Password</p>
        </div>
        <div className="Setting_Page_Delete_User_Profile_Container">
          <h1>Delete User Profile</h1>
          <p>
            NOTE : You can be able to recover after you delete your user profile
          </p>
          <button onClick={deleteUser}>Delete Profile</button>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
