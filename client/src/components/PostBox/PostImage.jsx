import React from "react";

const PostImage = (props) => {
  return (
    <>
      <div className="HomePage_Feed_Image_Container">
        {props.postPicture === undefined ? (
          ""
        ) : (
          <img src={props.postPicture} alt="post" />
        )}
      </div>
    </>
  );
};

export default PostImage;
