import {
  SideBarDrawerAction,
  SideBarDrawerActionTypes,
  SideBarDrawerState,
} from "./types";

const initialState: SideBarDrawerState = false;

const sideBarDrawerReducer = (
  state: SideBarDrawerState = initialState,
  action: SideBarDrawerAction
) => {
  if (action.type === SideBarDrawerActionTypes.OPEN_SIDEBAR_DRAWER) {
    return action.payload;
  } else {
    return state;
  }
};

export default sideBarDrawerReducer;
