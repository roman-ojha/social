import React from "react";
import AppIcon from "../assets/icons/Social_Icon.ico";
import constant from "../constant/constant";
import "../styles/components/defaultSocialPost.css";
import { useMediaQuery } from "react-responsive";

const DefaultSocialPost = () => {
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });
  return (
    <>
      <div className="Default_Social_Post_Container">
        <div className="Default_Social_Post">
          <div className="Default_Social_Post_Image_View_Container">
            <img src={AppIcon} alt={constant.applicationName} />
            <h1>Welcome to {constant.applicationName}</h1>
            <h2>The place where World start Connecting</h2>
          </div>
          <div className="Default_Social_Post_Info_Container">
            <ul>
              {isMax850px ? (
                <li>
                  {/* for small screen */}
                  You can Follow user through suggested user or followed by user
                  by clicking the right side blinking array button
                </li>
              ) : (
                <li>
                  You can Follow user through suggested user or followed by user
                  shown at the right side of the page
                </li>
              )}
              <li>
                You can follow user through searching the specific user that you
                want to follow
              </li>
              <li>
                You can Post you thought, comment you thought on post or like
                the post
              </li>
              <li>You can chat to other users</li>
              <li>You can see other user stories that you had followed on</li>
              <li>You can see your's and other user profile</li>
              <li>
                You can change profile picture, unique userID/username,
                displayed name, password on Setting page
              </li>
              <li>You can watch and search videos from the video page</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultSocialPost;
