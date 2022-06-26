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

const PostButton = () => {
  const dispatch = useDispatch();
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const {
    userPostResponseData,
    homePageUserPostFieldDataAction,
    showLoadingSpinner,
    setHomePagePostFieldViewValue,
  } = bindActionCreators(actionCreators, dispatch);

  // uploading post to database
  const uploadUserPost = async (e) => {
    try {
      e.preventDefault();
      showLoadingSpinner(true);
      var image = document.getElementById("image-input").files[0];
      let data = new FormData();
      data.append("image", image);
      data.append("caption", homePageUserPostFieldData.content);
      // we can be able to pass the other form of data like this
      const res = await Api.post(data);
      const resData = await res.data;
      if (res.status === 200 && resData.success) {
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
      showLoadingSpinner(false);
      setHomePagePostFieldViewValue("min");
    } catch (err) {
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
        <button
          className="HomePage_MaxView_UserPost_Field_Post_Button"
          onClick={uploadUserPost}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default PostButton;
