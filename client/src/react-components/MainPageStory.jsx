import React from "react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../assets/Images/User_profile_Icon.svg";
import "../styles/react-components/mainPageStory.css";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "react-responsive";
import { storyIndex } from "../redux-actions";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

const MainPageStory = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userStoriesStore = useSelector((state) => state.userStoriesReducer);
  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
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
          <div
            onClick={() => {
              dispatch(storyIndex(props.index));
              history.push("/u/story");
            }}
            className="Friends_Story_Picutre_Container"
          >
            <img
              src={
                props.storiesInformation.picture
                  ? props.storiesInformation.picture
                  : User_Profile_Icon
              }
              alt=""
              className="Friend_Story_Picture"
            />
          </div>
          <div
            className="Friend_Story_Name"
            onClick={() => {
              dispatch(storyIndex(props.index));
              history.push("/u/story");
            }}
          >
            {props.storiesInformation.name.split(" ")[0]}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="MainPage_User_Stories_Container">
        <AddStory />
        {/* showing friends story */}

        {userStoriesStore.data.map((stories, index) => {
          if (isMobile) {
            if (index <= 4) {
              return (
                <FriendStory
                  storiesInformation={stories}
                  key={index}
                  index={index}
                />
              );
            }
          } else if (index <= 6) {
            return (
              <FriendStory
                storiesInformation={stories}
                key={index}
                index={index}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default MainPageStory;
