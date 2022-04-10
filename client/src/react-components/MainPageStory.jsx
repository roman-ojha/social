import React from "react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import "../styles/react-components/mainPageStory.css";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "react-responsive";

const MainPageStory = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userStoriesStore = useSelector((state) => state.userStoriesReducer);
  const is = useMediaQuery({
    query: "(max-width: 300px)",
  });
  const AddStory = () => {
    return (
      <>
        <div className="Current_User_Story_Container">
          <div className="Current_User_Story_Picure_Container">
            <Icon
              className="Current_User_Story_Add_Icon"
              icon="akar-icons:circle-plus"
              style={{ color: "white", height: "1.4rem" }}
            />
            <img
              src={
                userProfileDetailStore.picture === undefined
                  ? User_Profile_Icon
                  : userProfileDetailStore.picture
              }
              alt=""
              className="Current_User_Story_Picture"
            />
          </div>
          <p className="Current_User_Story_Name">Create</p>
        </div>
      </>
    );
  };
  const FriendStory = (props) => {
    return (
      <>
        <div className="Friends_Story_Container">
          <div className="Friends_Story_Picutre_Container">
            <img
              src={props.storiesInformation.picture}
              alt=""
              className="Friend_Story_Picture"
            />
          </div>
          <p className="Friend_Story_Name">
            {props.storiesInformation.name.split(" ")[0]}
          </p>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="MainPage_User_Stories_Container">
        <AddStory />
        {/* showing friends story */}

        {userStoriesStore.stories.map((stories, index) => {
          if (is) {
            if (index <= 4) {
              return <FriendStory storiesInformation={stories} key={index} />;
            }
          } else if (index <= 6) {
            return <FriendStory storiesInformation={stories} key={index} />;
          }
        })}
      </div>
    </>
  );
};

export default MainPageStory;
