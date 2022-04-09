import React from "react";
import "../styles/react-components/profileAlbum.css";

const ProfileAlbums = (props) => {
  return (
    <div className="ProfilePage_Album_Container">
      <img
        src={props.userFeedData.picture.url}
        className="ProfilePage_Albums_Image"
        alt="album"
      />
    </div>
  );
};

export default ProfileAlbums;
