import {
  MoreProfileAction,
  MoreProfileActionTypes,
  MoreProfileState,
} from "./types";
import { Dispatch } from "react";

export const openMoreProfileBox = (data: MoreProfileState) => {
  return (dispatch: Dispatch<MoreProfileAction>) => {
    dispatch({
      type: MoreProfileActionTypes.OPEN_MORE_PROFILE_BOX,
      payload: data,
    });
  };
};
