import {
  //   NotificationBoxState,
  NotificationBoxActionTypes,
  NotificationBoxAction,
  NotificationBoxState,
} from "./types";
import { Dispatch } from "react";

export const openNotificationBox = (data: NotificationBoxState["open"]) => {
  return (dispatch: Dispatch<NotificationBoxAction>) => {
    dispatch({
      type: NotificationBoxActionTypes.OPEN_NOTIFICATION_BOX,
      payload: data,
    });
  };
};

export const setNotificationData = (
  data: NotificationBoxState["notificationData"]
) => {
  return (dispatch: Dispatch<NotificationBoxAction>) => {
    dispatch({
      type: NotificationBoxActionTypes.SET_NOTIFICATION_DATA,
      payload: data,
    });
  };
};
