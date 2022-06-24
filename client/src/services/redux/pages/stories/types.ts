export interface StoriesPageState {
  storyIndex: number;
  data: [];
}

export enum StoriesPageActionTypes {
  SET_USER_STORIES = "setUserStories",
  SET_STORY_INDEX = "setStoryIndex",
}
export interface SetUserStoriesAction {
  type: StoriesPageActionTypes.SET_USER_STORIES;
  payload: any;
}

export interface SetStoriesIndexAction {
  type: StoriesPageActionTypes.SET_STORY_INDEX;
  payload: number;
}

export type StoriesPageAction = SetUserStoriesAction | SetStoriesIndexAction;
