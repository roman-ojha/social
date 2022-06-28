import React, { useState } from "react";
import "../../styles/components/postBox.css";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import PostInfo from "./PostInfo";
import LikeCommentShare from "./LikeCommentShare";
import CommentField from "./CommentField";
import CommentedUser from "./CommentedUser";
import UserPostType, { UserPostCommentsType } from "../../interface/userPost";

export interface PostBoxProps {
  userMainInformation: {
    name: string;
    email: string;
    picture: string;
    userID: string;
    id: string;
  };
  userFeedData: UserPostType;
}

export interface PostInformationInterface {
  postPicture: string | undefined;
  postCaption: string;
  userPicture: string;
  userID: string;
  userName: string;
}

export interface CommentInfoState {
  commentNo: number;
  postCommentInfo: UserPostCommentsType;
}

const PostBox: React.FC<PostBoxProps> = ({
  userMainInformation,
  userFeedData,
}): JSX.Element => {
  const [postInformation] = useState<PostInformationInterface>({
    postPicture: userFeedData.picture ? userFeedData.picture.url : undefined,
    postCaption: userFeedData.caption,
    userPicture: userMainInformation.picture,
    userID: userMainInformation.userID,
    userName: userMainInformation.name,
  });

  const [commentInfo, setCommentInfo] = useState<CommentInfoState>({
    commentNo: userFeedData.comments.No,
    postCommentInfo: userFeedData.comments.by
      ? userFeedData.comments.by[
          Math.floor(Math.random() * userFeedData.comments.by.length)
        ]
      : {
          picture: "",
          userID: "",
          comment: "",
        },
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
            postDate={userFeedData.date}
          />
          <LikeCommentShare
            userFeedData={userFeedData}
            userMainInformation={userMainInformation}
            commentNo={commentInfo.commentNo}
          />
        </div>
        <div className="UserPostFeed_Comment_Box">
          <CommentedUser
            commentInfo={commentInfo}
            postId={userFeedData.id}
            setCommentInfo={setCommentInfo}
          />
          <CommentField
            userFeedData={userFeedData}
            userMainInformation={userMainInformation}
            commentInfo={commentInfo}
            setCommentInfo={setCommentInfo}
          />
        </div>
      </article>
    </>
  );
};

export default PostBox;
