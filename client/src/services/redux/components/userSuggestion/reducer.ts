import {
  UserSuggestionAction,
  UserSuggestionState,
  UserSuggestionActionTypes,
} from "./types";

const initialState: UserSuggestionState[] = [];

const userSuggestionReducer = (
  state: UserSuggestionState[] = initialState,
  action: UserSuggestionAction
) => {
  if (action.type === UserSuggestionActionTypes.USER_SUGGESTION) {
    const newList = action.payload.map((element) => {
      return {
        ...element,
        followed: false,
      };
    });
    return newList.sort((a, b) => {
      if (a.type !== "bot" || b.type !== "bot") {
        return;
      } else {
        return Math.random() - 0.5;
      }
    });
  } else if (
    action.type === UserSuggestionActionTypes.IS_FOLLOWED_SUGGESTED_USER
  ) {
    return state.map((user) =>
      user.userID === action.payload.userID
        ? { ...user, followed: action.payload.followed }
        : user
    );
  } else {
    return state;
  }
};

export default userSuggestionReducer;
