import {
  RightPartDrawerAction,
  RightPartDrawerActionTypes,
  RightPartDrawerState,
} from "./types";

const initialState: RightPartDrawerState = false;

const rightPartDrawerReducer = (
  state: RightPartDrawerState = initialState,
  action: RightPartDrawerAction
) => {
  switch (action.type) {
    case RightPartDrawerActionTypes.OPEN_RIGHT_PART_DRAWER:
      return action.payload;
    default:
      return state;
  }
};

export default rightPartDrawerReducer;
