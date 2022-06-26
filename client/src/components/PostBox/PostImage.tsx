import React from "react";
import { PostInformationInterface } from "./PostBox";

const PostImage: React.FC<{
  postPicture: PostInformationInterface["postPicture"];
}> = ({ postPicture }): JSX.Element => {
  return (
    <>
      <div className="HomePage_Feed_Image_Container">
        {postPicture === undefined ? "" : <img src={postPicture} alt="post" />}
      </div>
    </>
  );
};

export default PostImage;
