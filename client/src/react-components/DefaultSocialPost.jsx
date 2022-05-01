import React from "react";
import AppIcon from "../assets/icons/Social_Icon.ico";

const DefaultSocialPost = () => {
  return (
    <>
      <div className="Default_Social_Post_Container">
        <div className="Default_Social_Post_Image_View_Container">
          <img src={AppIcon} alt="social" />
          <h1>Welcome to Social</h1>
          <h2>The place where World start Connecting</h2>
        </div>
        <div className="Default_Social_Post_Info_Container">
          <ul>
            <li>
              You can Follow user through suggested user or followed by user
              shown at the right side of the page
            </li>
            <li>
              You can follow user through searching the specific user that you
              want to follow
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DefaultSocialPost;
