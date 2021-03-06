import React from "react";
import "../styles/components/profileAlbum.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { AppState } from "../services/redux";
import { ProfilePageDataState } from "../services/redux/pages/profile/profilePageData/types";

interface ProfileAlbumsProps {
  profilePageData: ProfilePageDataState;
}

const ProfileAlbums: React.FC<ProfileAlbumsProps> = ({
  profilePageData,
}): JSX.Element => {
  const loadingContainerSpinnerStyle = {
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(199 199 199 / 22%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px",
  };
  const loadingSpinnerStyle = {
    border: "5px dotted #dddddd",
    borderTop: "5px dotted var(--primary-color-darker-5)",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    animation: "loadingSpinner 1s linear infinite",
  };
  const rootUserProfileDataState = useSelector(
    (state: AppState) => state.rootUserProfileDataState
  );
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );

  return (
    <>
      <Helmet>
        <title>{profilePageData.userID}/albums</title>
      </Helmet>
      {profilePageData.userID === userProfileDetailStore.userID &&
      rootUserProfileDataState.fetchedRootUserProfileData === false ? (
        // if profile page is of rootUser and post data had not been fetched then we will run loading spinner
        <>
          <div style={loadingContainerSpinnerStyle}>
            <div style={loadingSpinnerStyle}></div>
          </div>
        </>
      ) : (
        <div className="ProfilePage_Albums_Container">
          {profilePageData.posts.map((post, index) => {
            if (post.picture) {
              return (
                <div className="ProfilePage_Album_Container" key={index}>
                  <a
                    href={post.picture === undefined ? "" : post.picture.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={post.picture === undefined ? "" : post.picture.url}
                      className="ProfilePage_Albums_Image"
                      alt="album"
                    />
                  </a>
                </div>
              );
            } else {
              return "";
            }
          })}
        </div>
      )}
    </>
  );
};

export default ProfileAlbums;
