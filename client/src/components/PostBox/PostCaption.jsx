import React from "react";

const PostCaption = (props) => {
  return (
    <>
      <div className="HomePage_Feed_User_Caption_Container">
        <p>{props.postCaption}</p>
      </div>
    </>
  );
};

export default PostCaption;
