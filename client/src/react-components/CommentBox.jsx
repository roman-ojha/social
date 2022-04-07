import React from "react";
import "../styles/react-components/CommentBox.css";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { openCommentBoxAction } from "../redux-actions";
const CommentBox = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document
      .getElementsByClassName("CommentBox_Container")[0]
      .addEventListener("click", (e) => {
        if (
          !document.getElementsByClassName("CommentBox")[0].contains(e.target)
        ) {
          dispatch(openCommentBoxAction(false));
        }
      });
  }, []);
  const userProfileDetail = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  return (
    <>
      <div className="CommentBox_Container">
        <div className="CommentBox">
          <div className="CommentBox_RootUser_Post_Field_Container">
            <img
              className="CommentBox_Image"
              src={userProfileDetail.picture}
              img="User"
            />
            <input
              className="CommentBox_Input_Field"
              placeholder="Give some thought on this post..."
              type="text"
            />
            <Icon
              className="CommentBox_Input_Emoji"
              icon="fluent:emoji-24-regular"
            />
            <Icon className="CommentBox_Input_Emoji" icon="bx:send" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
