import React, { useState } from "react";
import "../../styles/components/postBox.css";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import PostInfo from "./PostInfo";
import LikeCommentShare from "./LikeCommentShare";
import CommentField from "./CommentField";
import CommentedUser from "./CommentedUser";

const PostBox = (props) => {
  const [postInformation] = useState({
    postPicture: props.userFeedData.picture
      ? props.userFeedData.picture.url
      : undefined,
    postCaption: props.userFeedData.caption,
    userPicture: props.userMainInformation.picture,
    userID: props.userMainInformation.userID,
    userName: props.userMainInformation.name,
  });

  const [commentInfo, setCommentInfo] = useState({
    commentNo: props.userFeedData.comments.No,
    postCommentInfo: props.userFeedData.comments.by
      ? props.userFeedData.comments.by[
          Math.floor(Math.random() * props.userFeedData.comments.by.length)
        ]
      : [],
  });

  return (
    <>
      <article className="HomePage_Feed_Content_Container">
        <PostImage postPicture={postInformation.postPicture} />
        <PostCaption postCaption={postInformation.postCaption} />
        <div className="HomePage_Feed_Info_Container">
          <PostInfo
            postUserID={postInformation.userID}
            postUserName={postInformation.userName}
            postUserPicture={postInformation.userPicture}
            postDate={props.userFeedData.date}
          />
          <LikeCommentShare
            userFeedData={props.userFeedData}
            userMainInformation={props.userMainInformation}
            commentNo={commentInfo.commentNo}
          />
        </div>
        <div className="UserPostFeed_Comment_Box">
          <CommentedUser
            commentInfo={commentInfo}
            postId={props.userFeedData.id}
            setCommentInfo={setCommentInfo}
          />
          <CommentField
            userFeedData={props.userFeedData}
            userMainInformation={props.userMainInformation}
            commentInfo={commentInfo}
            setCommentInfo={setCommentInfo}
          />
        </div>
      </article>
    </>
  );
};

export default PostBox;
