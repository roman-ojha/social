import {
  MoreProfileAction,
  MoreProfileActionTypes,
  MoreProfileState,
} from "./types";

const initialState: MoreProfileState = false;

const moreProfileBoxReducer = (
  state: MoreProfileState = initialState,
  action: MoreProfileAction
) => {
  if (action.type === MoreProfileActionTypes.OPEN_MORE_PROFILE_BOX) {
    return action.payload;
  } else {
    return state;
  }
};

export default moreProfileBoxReducer;
