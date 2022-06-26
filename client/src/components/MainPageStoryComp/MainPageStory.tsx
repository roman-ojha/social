import React from "react";
import { useSelector } from "react-redux";
import "../../styles/components/mainPageStory.css";
import { useMediaQuery } from "react-responsive";
import AddStory from "./AddStory";
import FriendStory from "./FriendStory";
import { AppState } from "../../services/redux";

const MainPageStory = () => {
  const userStoriesStore = useSelector(
    (state: AppState) => state.userStoriesReducer
  );
  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });
  return (
    <>
      <section className="MainPage_User_Stories_Container">
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
            } else {
              return "";
            }
          } else if (index <= 6) {
            return (
              <FriendStory
                storiesInformation={stories}
                key={index}
                index={index}
              />
            );
          } else {
            return "";
          }
        })}
      </section>
    </>
  );
};

export default MainPageStory;
