import React from "react";
import { useSelector } from "react-redux";
import "../styles/components/profileAlbum.css";

const ProfileAlbums = (props) => {
  const profilePageData = useSelector((state) => state.profilePageDataReducer);
  return (
    <div className="ProfilePage_Albums_Container">
      {profilePageData.posts.map((post, index) => {
        if (post.picture === undefined) {
          return "";
        }
        return (
          <div className="ProfilePage_Album_Container" key={index}>
            <a
              href={post.picture === undefined ? "" : post.picture.url}
              target="_blank"
            >
              <img
                src={post.picture === undefined ? "" : post.picture.url}
                className="ProfilePage_Albums_Image"
                alt="album"
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileAlbums;
