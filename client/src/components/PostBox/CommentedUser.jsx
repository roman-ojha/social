import React from "react";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";

const CommentedUser = (props) => {
  return (
    <>
      <div className="UserPostFeed_CommentBox_CommentList">
        {props.commentInfo.postCommentInfo ? (
          <div className="UserPostFeed_CommentBox_UserComment">
            <img
              src={
                props.commentInfo.postCommentInfo.picture
                  ? props.commentInfo.postCommentInfo.picture
                  : User_Profile_Icon
              }
            />
            <div>
              <h3 onClick={() => {}}>
                {props.commentInfo.postCommentInfo.userID}
              </h3>
              <p>{props.commentInfo.postCommentInfo.comment}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CommentedUser;
