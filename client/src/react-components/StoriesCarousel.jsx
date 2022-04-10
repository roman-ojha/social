import React from "react";
import { useEffect } from "react";
import "../styles/react-components/stories.css";
import { Icon } from "@iconify/react";
import { showUserStories } from "../redux-actions";
import { useDispatch, useSelector } from "react-redux";

const StoriesCarousel = () => {
  const dispatch = useDispatch();
  const userStoriesStore = useSelector((state) => state.userStoriesReducer);
  useEffect(() => {
    const caption = [];
    const date = [];
    const color = [
      "#eb67a0",
      "#ff7398",
      "#d8a3cdd8",
      "#9e57d4d5",
      "#FF8959",
      "#FFC44F",
      "#af71de",
      "#ff8080",
      "#ff73ab",
      "#FF9B54",
      "#FFCB53",
    ];
    const color_options = [];
    const image_options = [];
    userStoriesStore.data.map((data, index) => {
      if (data.stories.caption.length > 55) {
        caption[index] = data.stories.caption.slice(0, 55);
      } else {
        caption[index] = data.stories.caption;
      }
      date[index] = data.stories.date;
      color_options[index] = color[index % color.length];
      image_options[index] = data.stories.picture;
    });
    var i = 0;
    const currentOptionText1 = document.getElementById("current-option-text1");
    const currentOptionText2 = document.getElementById("current-option-text2");
    const currentOptionImage = document.getElementById("image");
    const carousel = document.getElementById("carousel-wrapper");
    const mainMenu = document.getElementById("menu");
    const optionPrevious = document.getElementById("previous-option");
    const optionNext = document.getElementById("next-option");

    currentOptionText1.innerText = caption[i];
    currentOptionText2.innerText = date[i];
    currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    mainMenu.style.background = color_options[i];

    optionNext.onclick = function () {
      i = i + 1;
      i = i % caption.length;
      currentOptionText1.dataset.nextText = caption[i];

      currentOptionText2.dataset.nextText = date[i];

      mainMenu.style.background = color_options[i];
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
  });
  return (
    <>
      <div id="carousel-stories-container">
        <div id="carousel-wrapper">
          <div id="menu">
            <Icon
              icon="ep:close-bold"
              id="Carousel-Stories-Close-icon"
              onClick={() => {
                dispatch(showUserStories(false));
              }}
            />
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
              <button id="next-option"></button>
              <button id="previous-option"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesCarousel;
