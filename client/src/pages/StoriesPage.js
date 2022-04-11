import React from "react";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import "../styles/pages/StoriesPage.css";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

const StoriesPage = () => {
  const history = useHistory();
  const userStoriesStore = useSelector((state) => state.userStoriesReducer);
  useEffect(() => {
    const caption = [];
    const date = [];
    const color = [
      // [<Normal>,<darkish>]
      ["#eb67a0", "#361926dc"],
      ["#ff7398", "#552633e0"],
      ["#d8a3cd", "#473544d8"],
      ["#9e57d4", "#381e4bd8"],
      ["#FF8959", "#462518e1"],
      ["#FFC44F", "#634c1ee1"],
      ["#af71de", "#3b264be8"],
      ["#ff8080", "#613232e3"],
      ["#ff73ab", "#632e43e3"],
      ["#FF9B54", "#583720e5"],
      ["#FFCB53", "#615028e5"],
    ];

    const color_options = [];
    const image_options = [];
    const background_option = [];
    userStoriesStore.data.map((data, index) => {
      if (data.stories.caption.length > 150) {
        caption[index] = data.stories.caption.slice(0, 55);
      } else {
        caption[index] = data.stories.caption;
      }
      date[index] = data.stories.date;
      color_options[index] = color[index % color.length][0];
      background_option[index] = color[index % color.length][1];
      image_options[index] = data.stories.picture;
    });
    const currentOptionText1 = document.getElementById("current-option-text1");
    const currentOptionText2 = document.getElementById("current-option-text2");
    const currentOptionImage = document.getElementById("image");
    const carousel = document.getElementById("carousel-wrapper");
    const mainMenu = document.getElementById("menu");
    const optionPrevious = document.getElementById("previous-option");
    const optionNext = document.getElementById("next-option");
    const storiesPageContainer = document.getElementById(
      "Stories_Page_Container"
    );

    var i = userStoriesStore.storyIndex;
    currentOptionText1.innerText = caption[i];
    currentOptionText2.innerText = date[i];
    currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    mainMenu.style.background = color_options[i];
    storiesPageContainer.style.background = background_option[i];

    optionNext.onclick = () => {
      i = i + 1;
      i = i % caption.length;
      currentOptionText1.dataset.nextText = caption[i];

      currentOptionText2.dataset.nextText = date[i];

      mainMenu.style.background = color_options[i];
      storiesPageContainer.style.background = background_option[i];
      mainMenu.style.filter = ``;
      carousel.classList.add("anim-next");

      setTimeout(() => {
        currentOptionImage.style.backgroundImage =
          "url(" + image_options[i] + ")";
      }, 455);

      setTimeout(() => {
        currentOptionText1.innerText = caption[i];
        currentOptionText2.innerText = date[i];
        carousel.classList.remove("anim-next");
      }, 650);
    };

    optionPrevious.onclick = function () {
      if (i === 0) {
        i = caption.length;
      }
      i = i - 1;
      currentOptionText1.dataset.previousText = caption[i];

      currentOptionText2.dataset.previousText = date[i];

      mainMenu.style.background = color_options[i];
      storiesPageContainer.style.background = background_option[i];
      carousel.classList.add("anim-previous");

      setTimeout(() => {
        currentOptionImage.style.backgroundImage =
          "url(" + image_options[i] + ")";
      }, 455);

      setTimeout(() => {
        currentOptionText1.innerText = caption[i];
        currentOptionText2.innerText = date[i];
        carousel.classList.remove("anim-previous");
      }, 650);
    };
    document
      .getElementById("Stories_Page_Container")
      .addEventListener("click", (e) => {
        if (
          !document
            .getElementById("carousel-stories-container")
            .contains(e.target)
        ) {
          history.push("/u");
        }
      });
  });
  return (
    <>
      <div id="Stories_Page_Container">
        <div id="carousel-stories-container">
          <div id="carousel-wrapper">
            <div id="menu">
              <NavLink to="/u">
                <Icon icon="ep:close-bold" id="Carousel-Stories-Close-icon" />
              </NavLink>
              <div id="image"></div>
              <div id="current-option">
                <span
                  id="current-option-text1"
                  data-previous-text=""
                  data-next-text=""
                ></span>
                <span
                  id="current-option-text2"
                  data-previous-text=""
                  data-next-text=""
                ></span>
              </div>
              <div id="button-container">
                {/* <button id="next-option"></button> */}
                <span id="next-option">
                  <Icon
                    icon="akar-icons:circle-chevron-down-fill"
                    className="Next_Button"
                  />
                </span>
                <span id="previous-option">
                  <Icon
                    icon="akar-icons:circle-chevron-down-fill"
                    className="Previous_Button"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesPage;
