import React, { memo } from "react";
import { PostInformationInterface } from "./PostBox";

const PostCaption: React.FC<{
  postCaption: PostInformationInterface["postCaption"];
}> = ({ postCaption }): JSX.Element => {
  return (
    <>
      <div className="HomePage_Feed_User_Caption_Container">
        <p>{postCaption}</p>
      </div>
    </>
  );
};

export default memo(PostCaption);
