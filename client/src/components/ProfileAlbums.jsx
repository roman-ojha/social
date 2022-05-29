import React from "react";
import "../styles/components/profileAlbum.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const ProfileAlbums = (props) => {
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
    (state) => state.rootUserProfileDataState
  );
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );

  return (
    <>
      <Helmet>
        <title>{props.profilePageData.userID}/albums</title>
      </Helmet>
      {props.profilePageData.userID === userProfileDetailStore.userID &&
      rootUserProfileDataState.fetchedRootUserProfileData === false ? (
        // if profile page is of rootUser and post data had not been fetched then we will run loading spinner
        <>
          <div style={loadingContainerSpinnerStyle}>
            <div style={loadingSpinnerStyle}></div>
          </div>
        </>
      ) : (
        <div className="ProfilePage_Albums_Container">
          {props.profilePageData.posts.map((post, index) => {
            if (post.picture.url) {
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
            }
          })}
        </div>
      )}
    </>
  );
};

export default ProfileAlbums;
