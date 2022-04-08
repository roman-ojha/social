import React from "react";
import "../styles/react-components/CommentBox.css";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { commentBoxAction } from "../redux-actions";
import { instance as axios } from "../services/axios";
import { useState } from "react";

const CommentBox = () => {
  const commentBoxStore = useSelector((state) => state.commentBoxReducer);
  const [commentInputFieldData, setCommentInputFieldData] = useState("");
  const dispatch = useDispatch();
  const userProfileDetail = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  useEffect(() => {
    document
      .getElementsByClassName("CommentBox_Container")[0]
      .addEventListener("click", (e) => {
        if (
          !document.getElementsByClassName("CommentBox")[0].contains(e.target)
        ) {
          dispatch(
            commentBoxAction({
              openCommentBox: false,
              postID: "",
              to: "",
            })
          );
        }
      });
  }, []);

  const comment = async () => {
    try {
      const res = await axios({
        url: "/post/comment",
        method: "POST",
        data: {
          comment: commentInputFieldData,
          postID: commentBoxStore.postID,
          to: commentBoxStore.to,
        },
        withCredentials: true,
      });
      const data = await res.data;
      console.log(data);
    } catch (err) {
      // console.log(err);
    }
  };

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
              value={commentInputFieldData}
              onChange={(e) => {
                setCommentInputFieldData(e.target.value);
              }}
            />
            <Icon
              className="CommentBox_Input_Emoji"
              icon="fluent:emoji-24-regular"
            />
            <Icon
              className="CommentBox_Input_Emoji"
              icon="bx:send"
              onClick={comment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
