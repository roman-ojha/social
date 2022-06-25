export interface UserSuggestionState {
  userID: string;
}

export enum UserSuggestionActionTypes {
  USER_SUGGESTION = "userSugestion",
  IS_FOLLOWED_SUGGESTED_USER = "isFollowedSuggestedUser",
}
export interface UserSuggestion {
  type: UserSuggestionActionTypes.USER_SUGGESTION;
  payload: any;
}

export interface IsFollowedSuggestedUser {
  type: UserSuggestionActionTypes.IS_FOLLOWED_SUGGESTED_USER;
  payload: any;
}

export type UserSuggestionAction = UserSuggestion | IsFollowedSuggestedUser;
