import React from "react";
import { useSelector } from "react-redux";
import "../../styles/components/mainPageStory.css";
import { useMediaQuery } from "react-responsive";
import AddStory from "./AddStory";
import FriendStory from "./FriendStory";

const MainPageStory = () => {
  const userStoriesStore = useSelector((state) => state.userStoriesReducer);
  // console.log(userStoriesStore);
  const storiesData = userStoriesStore.data;
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
      </section>
    </>
  );
};

export default MainPageStory;
