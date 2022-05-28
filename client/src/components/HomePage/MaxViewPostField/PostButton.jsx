import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userPostResponseData,
  homePageUserPostFieldDataAction,
  showLoadingSpinner,
  setHomePagePostFieldViewValue,
} from "../../../services/redux-actions";
import { Icon } from "@iconify/react";
import Api from "../../../services/api/pages/homeApi";
import { toastError, toastSuccess } from "../../../services/toast";

const PostButton = () => {
  const dispatch = useDispatch();
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });

  // uploading post to database
  const uploadUserPost = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoadingSpinner(true));
      var image = document.getElementById("image-input").files[0];
      let data = new FormData();
      data.append("image", image);
      data.append("caption", homePageUserPostFieldData.content);
      // we can be able to pass the other form of data like this
      const res = await Api.post(data);
      const resData = await res.data;
      console.log(resData);
      if (res.status === 200 && resData.success) {
        toastSuccess(resData.msg);
        dispatch(userPostResponseData(resData.data));
        dispatch(
          homePageUserPostFieldDataAction({
            ...homePageUserPostFieldData,
            content: "",
            image: {},
          })
        );
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
      <div className="HomePage_MaxView_UserPost_Field_Back_and_Post_Button_Container">
        <Icon
          className="HomePage_MaxView_UserPost_Field_Back_Icon"
          icon="eva:arrow-back-fill"
          onClick={() => {
            dispatch(
              homePageUserPostFieldDataAction({
                ...homePageUserPostFieldData,
                content: homePageUserPostFieldData.content,
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
    </>
  );
};

export default PostButton;
