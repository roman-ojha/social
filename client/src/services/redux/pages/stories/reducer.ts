import {
  StoriesPageAction,
  StoriesPageState,
  StoriesPageActionTypes,
} from "./types";

const initialState: StoriesPageState = {
  storyIndex: 0,
  data: [],
};

const userStoriesReducer = (
  state: StoriesPageState = initialState,
  action: StoriesPageAction
) => {
  switch (action.type) {
    case StoriesPageActionTypes.SET_USER_STORIES:
      return {
        ...state,
        data: action.payload.sort((a, b) => {
          if (a.type !== "bot" || b.type !== "bot") {
            return;
          } else {
            return Math.random() - 0.5;
          }
        }),
      };
    case StoriesPageActionTypes.SET_STORY_INDEX:
      return {
        ...state,
        storyIndex: action.payload,
      };
    default:
      return state;
  }
};

export default userStoriesReducer;
