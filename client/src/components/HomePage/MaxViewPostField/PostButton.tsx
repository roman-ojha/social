import React, { ChangeEvent, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   userPostResponseData,
//   homePageUserPostFieldDataAction,
//   showLoadingSpinner,
//   setHomePagePostFieldViewValue,
// } from "../../../services/redux-actions";
import { Icon } from "@iconify/react";
import Api from "../../../services/api/pages/homeApi";
import { toastError, toastSuccess } from "../../../services/toast";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../services/redux";
import { Button } from "@mui/material";
import { AxiosError } from "axios";

const PostButton = () => {
  const dispatch = useDispatch();
  const homePageUserPostFieldData = useSelector((state: AppState) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const imagePickerState = useSelector(
    (state: AppState) => state.imagePickerReducer
  );

  const {
    userPostResponseData,
    homePageUserPostFieldDataAction,
    showLoadingSpinner,
    setHomePagePostFieldViewValue,
    submitImagePicker,
    setImagePickingFrom,
  } = bindActionCreators(actionCreators, dispatch);

  // uploading post to database
  const uploadUserPost = async (e) => {
    try {
      e.preventDefault();
      showLoadingSpinner(true);
      if (
        (imagePickerState.imageUrl !== null &&
          imagePickerState.imageFile === undefined) ||
        (imagePickerState.imageUrl === null &&
          imagePickerState.imageFile === undefined)
      ) {
        // Posting with imageUrl
        const postData = {
          imageUrl: imagePickerState.imageUrl,
          caption: homePageUserPostFieldData.content,
        };
        const res = await Api.postImageUrl(postData);
        const resData = await res.data;
        if (res.status === 200 && resData.success) {
          console.log(resData);
          toastSuccess(resData.msg);
          userPostResponseData({ ...resData.data, date: new Date() });
          homePageUserPostFieldDataAction({
            ...homePageUserPostFieldData,
            content: "",
            image: {},
          });
        } else {
          // error
          toastError(resData.msg);
        }
      } else if (
        imagePickerState.imageUrl === null &&
        imagePickerState.imageFile !== undefined
      ) {
        // var image = document.getElementById("image-input").files[0];
        let data = new FormData();
        data.append("image", imagePickerState.imageFile);
        data.append("caption", homePageUserPostFieldData.content);
        // we can be able to pass the other form of data like this
        const res = await Api.postFile(data);
        const resData = await res.data;
        if (res.status === 200 && resData.success) {
          toastSuccess(resData.msg);
          userPostResponseData({ ...resData.data, date: new Date() });
          homePageUserPostFieldDataAction({
            ...homePageUserPostFieldData,
            content: "",
            image: {},
          });
          submitImagePicker({
            imageFile: undefined,
            imageUrl: null,
            openedImagePicker: false,
          });
          setImagePickingFrom("homePagePostFiled");
        } else {
          // error
          toastError(resData.msg);
        }
      }
      showLoadingSpinner(false);
      setHomePagePostFieldViewValue("min");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      showLoadingSpinner(false);
    }
  };

  return (
    <>
      <div className="HomePage_MaxView_UserPost_Field_Back_and_Post_Button_Container">
        <Icon
          className="HomePage_MaxView_UserPost_Field_Back_Icon"
          icon="eva:arrow-back-fill"
          onClick={() => {
            homePageUserPostFieldDataAction({
              ...homePageUserPostFieldData,
              content: homePageUserPostFieldData.content,
            });
            setHomePagePostFieldViewValue("min");
          }}
        />
        <Button
          id="HomePage_MaxView_UserPost_Field_Post_Button"
          onClick={uploadUserPost}
        >
          Post
        </Button>
      </div>
    </>
  );
};

export default PostButton;
