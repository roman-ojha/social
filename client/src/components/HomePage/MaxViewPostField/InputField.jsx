import React from "react";
import { homePageUserPostFieldDataAction } from "../../../services/redux-actions";
import { useDispatch, useSelector } from "react-redux";

const InputField = () => {
  const dispatch = useDispatch();
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });

  return (
    <>
      <textarea
        className="HomePage_MaxView_UserPost_Input_Field"
        placeholder="Post Your Thought...."
        autoFocus
        value={homePageUserPostFieldData.content}
        onChange={(e) => {
          dispatch(
            homePageUserPostFieldDataAction({
              ...homePageUserPostFieldData,
              content: e.target.value,
            })
          );
        }}
      ></textarea>
    </>
  );
};

export default InputField;
