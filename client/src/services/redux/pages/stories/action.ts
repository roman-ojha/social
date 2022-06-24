import {
  StoriesPageAction,
  StoriesPageState,
  StoriesPageActionTypes,
} from "./types";
import { Dispatch } from "react";

export const setUserStories = (data: any) => {
  return (dispatch: Dispatch<StoriesPageAction>) => {
    dispatch({
      type: StoriesPageActionTypes.SET_USER_STORIES,
      payload: data,
    });
  };
};

export const setStoryIndex = (data: StoriesPageState["storyIndex"]) => {
  return (dispatch: Dispatch<StoriesPageAction>) => {
    dispatch({
      type: StoriesPageActionTypes.SET_STORY_INDEX,
      payload: data,
    });
  };
};
